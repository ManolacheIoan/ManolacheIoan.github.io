import { expect, test, type Page } from "@playwright/test";

/** Fails the test if the page logs an error or a request returns 404 from our own site. */
function watchForErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://localhost")) errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

test("home page (RO): name, sections and featured projects", async ({ page }) => {
  const errors = watchForErrors(page);
  await page.goto("/");
  await expect(page).toHaveTitle(/Ioan Manolache/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ioan Manolache");
  for (const id of ["proiecte", "despre", "educatie", "tehnologii", "contact"]) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
  await expect(page.locator("#proiecte").getByRole("heading", { name: "Manotek Watch" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("language switch goes to the English page and back", async ({ page }) => {
  await page.goto("/");
  await page.getByTitle("Switch to English").click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: /Things I.ve built/ })).toBeAttached();
  await page.getByTitle("Schimbă în română").click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ro");
});

test("theme toggle switches the theme and remembers it after reload", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  await page.getByRole("button", { name: /Comută pe tema/ }).click();
  await expect(html).not.toHaveAttribute("data-theme", before ?? "");
  const after = await html.getAttribute("data-theme");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", after ?? "");
});

test("projects page: filtering by kind narrows the list", async ({ page }) => {
  await page.goto("/proiecte/");
  const all = page.getByText(/^\d+ proiecte$/);
  const total = Number((await all.textContent())?.split(" ")[0]);
  expect(total).toBeGreaterThan(10);
  await page.getByRole("button", { name: /^Demo/ }).click();
  await expect(page.getByRole("button", { name: /^Demo/ })).toHaveAttribute("aria-pressed", "true");
  const demos = Number((await page.getByText(/^\d+ proiecte?$/).textContent())?.split(" ")[0]);
  expect(demos).toBeGreaterThan(0);
  expect(demos).toBeLessThan(total);
});

test("project page links to its source code on GitHub", async ({ page }) => {
  const errors = watchForErrors(page);
  await page.goto("/proiecte/fitplan/");
  await expect(page.getByRole("heading", { level: 1, name: "FitPlan" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Cod sursă/ })).toHaveAttribute(
    "href",
    "https://github.com/ManolacheIoan/fitplan",
  );
  expect(errors).toEqual([]);
});

test("contact form sends the message through Formspree", async ({ page }) => {
  let sent: string | null = null;
  await page.route("https://formspree.io/**", async (route) => {
    sent = route.request().postData();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/#contact");
  await page.getByLabel("Nume").fill("Ana Pop");
  await page.getByLabel("Email").fill("ana@example.com");
  await page.getByLabel("Mesaj").fill("Salut! Un mesaj de test.");
  await page.getByRole("button", { name: /Trimite mesajul/ }).click();
  await expect(page.getByText(/Mulțumesc! Mesajul a ajuns/)).toBeVisible();
  expect(sent).toContain("Ana Pop");
  expect(sent).toContain("ana@example.com");
});

test("contact form does not send when required fields are empty", async ({ page }) => {
  let requests = 0;
  await page.route("https://formspree.io/**", (route) => {
    requests++;
    return route.fulfill({ status: 200, body: "{}" });
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: /Trimite mesajul/ }).click();
  await expect(page.getByLabel("Nume")).toHaveJSProperty("validity.valueMissing", true);
  expect(requests).toBe(0);
});

test("unknown pages return the 404 page", async ({ page }) => {
  const response = await page.goto("/nu-exista/");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/404/);
});
