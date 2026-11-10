# Formelsamling – Matematik A

**Live:** https://frederikaxboeg-create.github.io/matematik-formelsamling/

En søgbar formelsamling til Matematik A i gymnasiet (stx), bygget op efter studieplanens forløb og kernestoffet. Den kan bruges som hjemmeside, installeres som app og virker uden internet.

Hører sammen med [Interaktiv Matematik](https://frederikaxboeg-create.github.io/interaktiv-matematik/), hvor man kan øve emnerne.

## Indhold

315 formler og regler i 24 emner plus en side med Maple-kommandoer:

- **Tal og algebra:** regneregler og algebra, ligninger og uligheder, procent og rente
- **Geometri, trigonometri og vektorer:** trigonometri, vektorer i planen, analytisk plangeometri, vektorer i rummet, areal og rumfang
- **Funktioner og infinitesimalregning:** funktionsbegrebet, lineære funktioner, andengradspolynomier, eksponentielle funktioner, potensfunktioner, logaritmer, trigonometriske funktioner, vækstmodeller og regression, differentialregning, integralregning, differentialligninger
- **Sandsynlighed og statistik:** deskriptiv statistik, kombinatorik og sandsynlighed, binomialfordelingen, normalfordelingen, hypotesetest og konfidensinterval

Hver formel har et navn, en forklaring og ofte et eksempel. Mange har også en Maple-kommando og en lille beregner («Regn med formlen»), der viser udregningen trin for trin.

## Funktioner

- **Søgning** på tværs af alle formler (tryk `/` for at hoppe til søgefeltet)
- **Studieplan:** forløbene i den rækkefølge, de er gennemgået, med status og link til formlerne
- **Favoritter:** tryk på stjernen på en formel – de gemmes kun i browseren
- **Beregnere:** 26 små regnemaskiner, fx andengradsligning, topunktsformler, trekantsberegning, vektorer, binomial- og normalfordeling
- **Udskrift:** hvert emne og hele samlingen kan udskrives eller gemmes som PDF
- **Link til en bestemt formel:** kæde-ikonet på hvert kort kopierer et direkte link
- Lyst og mørkt tema følger enhedens indstilling

## Installér som app

- **Android/Chrome/Edge:** tryk «Installér» øverst, eller brug browserens menu
- **iPhone/iPad:** åbn siden i Safari → Del → «Føj til hjemmeskærm»
- **Mac/PC:** i Chrome eller Edge, klik på installér-ikonet i adresselinjen
- Efter første besøg virker siden også uden internet

## Udgiv ændringer

Siden ligger på GitHub Pages fra `main`-grenen.

1. Kør `python3 tools/byg-sw.py` – det hæver cache-versionen i `sw.js` og genskaber listen over filer, så installerede apps henter de nye filer
2. `git commit -am "Beskrivelse"` og `git push`

Siden er opdateret efter et par minutter.

## Kør lokalt

Der er intet build-trin – det er ren HTML, CSS og JavaScript. Start en lokal webserver i mappen:

```bash
python3 -m http.server 5174
```

Åbn derefter <http://localhost:5174>. Lokalt er offline-cachen slået fra, så man altid ser de nyeste filer (tilføj `?sw` til adressen for at teste den).

## Struktur

```
index.html            Skal for siden (topbjælke med søgefelt + <main>)
css/style.css         Alt design, inkl. mørkt tema og udskrift
js/main.js            Routing og sider (forside, emne, søgning, studieplan, favoritter, udskrift)
js/kort.js            Formelkortet: formel, forklaring, eksempel, Maple og beregner
js/beregnere.js       Beregnerne og talformatering med decimalkomma
js/soeg.js            Søgeindeks og søgning
js/favoritter.js      Favoritter i localStorage
js/tex.js, ui.js      KaTeX-visning, egne TeX-makroer og DOM-hjælpere
js/emner/*.js         Et modul pr. emne med formlerne
js/emner/index.js     Emnernes rækkefølge og forløbene fra studieplanen
js/pwa.js, sw.js      Installérbar app og offline-cache
tools/byg-sw.py       Opdaterer sw.js før en udgivelse
vendor/katex/         KaTeX 0.16.11 (MIT-licens) – ligger lokalt, så det virker offline
```

### Ret status i studieplanen

Når et nyt forløb går i gang, rettes `status` i `FORLOEB` i `js/emner/index.js` (`done` = gennemgået, `now` = i gang nu, `next` = næste forløb).

### Tilføj en formel

Tilføj et objekt til `items` i det relevante emne-modul:

```js
{
  id: 'min-formel',                 // unik inden for emnet – bruges i linket
  name: 'Min formel',
  tex: r`a^2+b^2=c^2`,              // én formel, eller en liste af formler
  note: r`Forklaring med $x$ som inline-formel.`,
  ex: r`$3^2+4^2=5^2$`,             // valgfrit eksempel
  maple: 'solve(a^2 + b^2 = c^2, c)', // valgfri Maple-kommando
  calc: 'pythagoras',               // valgfri beregner fra js/beregnere.js
  kw: 'ekstra søgeord',
}
```

I stedet for `tex` kan man bruge `rows` (en liste af `[tekst, formel]`) eller `table` (`head` + `rows`). Formler skrives i TeX og vises med KaTeX.
