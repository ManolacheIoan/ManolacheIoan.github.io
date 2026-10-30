# John Mnl · Portofoliu

Portofoliul personal al lui Ioan Manolache (John Mnl). Next.js 16 (App Router), TypeScript, Tailwind CSS 4 și Motion. Site complet static, în română (implicit, `/`) și engleză (`/en/`).

## Pornire

```bash
npm install
npm run dev          # http://localhost:3000
npm run dev -- -H 0.0.0.0   # ca să-l deschizi și de pe telefon, din aceeași rețea Wi-Fi
npm run build        # generează site-ul static în /out
npm run lint && npm run typecheck
```

## Unde editezi conținutul

Tot textul stă în `/data`, iar componentele nu trebuie atinse.

| Fișier | Ce conține |
| --- | --- |
| `data/profile.ts` | nume, rol, intro din hero, „Despre mine”, email, linkuri, poză, CV, Formspree |
| `data/education.ts` | licența și masterul, facultatea, materiile, lucrarea de licență |
| `data/tech.ts` | tehnologiile pe categorii (și grupa „De la facultate”) |
| `data/projects.ts` | toate proiectele, cele recomandate (`featuredOrder`), stări, tehnologii |
| `data/manotek.ts` | secțiunea Manotek (`isLive: true` face linkul clickabil) |
| `data/ui.ts` | textele interfeței (meniu, butoane, titluri de secțiuni), RO + EN |

Cuvintele scrise între `*stele*` apar în italic serif, colorat (de ex. `"Lucruri pe care *le-am construit*"`).

**Capturi de ecran:** pui originalul (1200×750) în `assets/projects/<nume>.jpg`, rulezi `npm run images`, apoi treci `image: "<nume>"` la proiect în `data/projects.ts`.

## Ce mai trebuie completat

- [x] **Email:** `data/profile.ts` → `email` (acum e `[email@exemplu.ro]`).
- [x] **LinkedIn:** `data/profile.ts` → `socials.linkedin`. Cât timp e placeholder, e ascuns.
- [ ] **GitHub:** verifică dacă `https://github.com/ManolacheIoan` e linkul pe care vrei să-l arăți.
- [x] **Facultatea:** `data/education.ts` → `faculty` (de două ori). Verifică și anii (2022–2026, 2026–).
- [ ] **Materii relevante și lucrarea de licență** (opțional): `courses` și `thesis` în `data/education.ts`.
- [ ] **Tehnologii de la facultate:** `data/tech.ts` → grupa `university`. Grupa e ascunsă cât timp e goală.
- [x] **Poza:** pune `public/me.jpg` (portret 4:5) și scrie `photo: "/me.jpg"` în `data/profile.ts`.
- [ ] **CV:** înlocuiește `public/cv.pdf` (acum e o pagină placeholder).
- [ ] **Domeniu propriu (opțional):** site-ul e publicat la `https://manolacheioan.github.io`. Dacă iei un domeniu, schimbă `NEXT_PUBLIC_SITE_URL` în `.github/workflows/deploy.yml` și adaugă domeniul în Settings → Pages.
- [x] **Formular (opțional):** creează un formular pe formspree.io și pune ID-ul în `formspreeId`. Fără el, butonul deschide aplicația de email cu mesajul completat.
- [ ] **Manotek.ro:** când domeniul e online, pune `isLive: true` în `data/manotek.ts`. Captura `manotek.png` e făcută din build-ul local.
- [ ] **Disponibilitate:** textul „Deschis la colaborări” din hero e în `profile.availability` (pune `null` ca să-l ascunzi).

## Publicare

- **GitHub Pages (folosit acum):** la fiecare push pe `main`, `.github/workflows/deploy.yml` construiește site-ul și îl publică la https://manolacheioan.github.io.
- **Netlify:** conectezi repo-ul. `netlify.toml` setează deja build-ul (`npm run build` → `out`) și cache-ul.
- **Vercel:** importi proiectul. Detectează Next.js și exportul static automat.

## Detalii tehnice

- Două layout-uri rădăcină: `app/(ro)` și `app/(en)/en`. Pagina 404 e în `app/global-not-found.tsx`.
- Tema e salvată în `localStorage`. `components/ThemeScript.tsx` o aplică înainte de prima afișare, deci nu există flash la încărcare.
- Toate animațiile respectă `prefers-reduced-motion`: CSS-ul le oprește, iar Motion e configurat cu `reducedMotion="user"`.
- Tranzițiile între pagini folosesc `<ViewTransition>` din React. Captura unui proiect „zboară” din card în pagina proiectului.
- Paletă: prună-negru `#110c14` și galben-sulf `#e6d35c` (tema întunecată), hârtie liliachie `#f1edf1` și prună `#7a2a69` (tema luminoasă). Fonturi: Bricolage Grotesque, Instrument Serif, Geist și Geist Mono.
- Lighthouse, la ultima verificare: desktop 98–99 la performanță și 100 la accesibilitate, bune practici și SEO. Pe mobil (4G lent simulat), performanța e ~83 din cauza celor patru fonturi web.
