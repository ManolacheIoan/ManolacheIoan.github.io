import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Automatic accessibility check (axe, WCAG 2.2 A and AA) on the main pages.
// Reduced motion (which the site honours) turns off the fade-in animations, so axe checks the
// final colours instead of text that is still half transparent.
test.use({ reducedMotion: "reduce" });

for (const path of ["/", "/en/", "/proiecte/", "/proiecte/fitplan/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
