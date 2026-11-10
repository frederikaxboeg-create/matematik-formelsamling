// Funktionsbegrebet: grundbegreber, sammensatte og omvendte funktioner og forskydning af grafer.
const r = String.raw;

export default {
  id: 'funktioner',
  title: 'Funktioner – grundbegreber',
  formula: r`(f\circ g)(x)=f(g(x))`,
  desc: 'Definitions- og værdimængde, nulpunkter, monotoni, sammensat og omvendt funktion, forskydning af grafer og oversigt over funktionstyperne.',
  practice: 'funktioner',
  sections: [
    {
      title: 'Grundbegreber',
      items: [
        {
          id: 'funktion',
          name: 'Funktion, definitionsmængde og værdimængde',
          tex: r`y=f(x)\qquad x\in\Dm(f)\qquad y\in\Vm(f)`,
          note: r`En funktion knytter netop én $y$-værdi til hver $x$-værdi. $\Dm(f)$ er de $x$-værdier, funktionen er defineret for, og $\Vm(f)$ er de $y$-værdier, den kan antage.`,
          kw: 'definitionsmængde værdimængde uafhængig afhængig variabel',
        },
        {
          id: 'nulpunkt',
          name: 'Nulpunkter og skæring med akserne',
          rows: [
            ['Nulpunkter (skæring med x-aksen)', r`f(x)=0`],
            ['Skæring med y-aksen', r`\big(0,\,f(0)\big)`],
            ['Skæring mellem to grafer', r`f(x)=g(x)`],
          ],
          kw: 'nulpunkt rod skæringspunkt',
        },
        {
          id: 'monotoni',
          name: 'Voksende og aftagende',
          rows: [
            ['Voksende', r`x_1<x_2\;\Rightarrow\;f(x_1)<f(x_2)`],
            ['Aftagende', r`x_1<x_2\;\Rightarrow\;f(x_1)>f(x_2)`],
          ],
          note: 'Monotoniforhold angiver de intervaller, hvor funktionen er voksende, og dem, hvor den er aftagende.',
          kw: 'monotoniforhold',
        },
        {
          id: 'ekstrema',
          name: 'Maksimum og minimum',
          note: r`$f$ har <b>globalt maksimum</b> i $x_0$, hvis $f(x_0)\geq f(x)$ for alle $x$ i definitionsmængden, og <b>lokalt maksimum</b>, hvis det gælder for alle $x$ i nærheden af $x_0$. Tilsvarende for minimum med $\leq$. Stedet $x_0$ kaldes maksimumssted, og værdien $f(x_0)$ kaldes maksimum.`,
          kw: 'ekstremum ekstrema globalt lokalt maksimumssted',
        },
      ],
    },
    {
      title: 'Sammensat og omvendt funktion',
      items: [
        {
          id: 'sammensat',
          name: 'Sammensat funktion',
          tex: r`(f\circ g)(x)=f\big(g(x)\big)`,
          note: r`$g$ er den indre funktion, og $f$ er den ydre. Regn indefra og ud.`,
          ex: r`$f(x)=\sqrt{x}$ og $g(x)=2x+1$: $\;f(g(x))=\sqrt{2x+1}$, mens $g(f(x))=2\sqrt{x}+1$.`,
          kw: 'indre ydre funktion bolle',
        },
        {
          id: 'omvendt',
          name: 'Omvendt funktion',
          tex: r`f^{-1}(y)=x\;\Leftrightarrow\;f(x)=y`,
          note: r`$f\big(f^{-1}(x)\big)=x$ og $f^{-1}\big(f(x)\big)=x$. Graferne for $f$ og $f^{-1}$ er hinandens spejlbilleder i linjen $y=x$. Eksempler: $e^x$ og $\ln(x)$, $\;10^x$ og $\log(x)$, $\;x^2$ (for $x\geq 0$) og $\sqrt{x}$.`,
          kw: 'invers funktion spejling',
        },
      ],
    },
    {
      title: 'Forskydning og spejling af grafer',
      items: [
        {
          id: 'forskydning',
          name: 'Parallelforskydning',
          rows: [
            ['Lodret forskydning: k op', r`g(x)=f(x)+k`],
            ['Vandret forskydning: h mod højre', r`g(x)=f(x-h)`],
            ['Forskydning med vektoren (h, k)', r`g(x)=f(x-h)+k`],
          ],
          note: r`Bemærk fortegnet: $f(x-3)$ flytter grafen 3 mod <b>højre</b>, og $f(x+3)$ flytter den 3 mod venstre.`,
          ex: r`$g(x)=(x-2)^2+1$ er parablen $x^2$ flyttet 2 mod højre og 1 op – toppunktet er $(2;1)$.`,
          kw: 'parallelforskydning flytte graf vandret lodret',
        },
        {
          id: 'spejling',
          name: 'Spejling og strækning',
          rows: [
            ['Spejling i x-aksen', r`g(x)=-f(x)`],
            ['Spejling i y-aksen', r`g(x)=f(-x)`],
            ['Lodret strækning med faktor k', r`g(x)=k\cdot f(x)`],
          ],
        },
        {
          id: 'stykkevis',
          name: 'Stykkevis defineret funktion',
          tex: r`f(x)=\begin{cases}g(x) & \text{for } x<a\\ h(x) & \text{for } x\geq a\end{cases}`,
          note: 'Funktionen har forskellige forskrifter i forskellige intervaller.',
          kw: 'gaffelfunktion stykkevis',
        },
      ],
    },
    {
      title: 'Oversigt over funktionstyper',
      items: [
        {
          id: 'funktionstyper',
          name: 'De elementære funktioner',
          wide: true,
          table: {
            head: ['Type', 'Forskrift', 'Graf og kendetegn'],
            rows: [
              ['<a href="#/lineaere">Lineær</a>', r`$f(x)=ax+b$`, 'Ret linje med hældning a'],
              ['<a href="#/andengrad">Andengradspolynomium</a>', r`$f(x)=ax^2+bx+c$`, 'Parabel med toppunkt'],
              ['<a href="#/eksponentielle">Eksponentiel</a>', r`$f(x)=b\cdot a^x$`, 'Vokser eller aftager med fast procent'],
              ['<a href="#/potens">Potens</a>', r`$f(x)=b\cdot x^a$`, 'Procent–procent-vækst, defineret for x > 0'],
              ['<a href="#/logaritmer">Logaritme</a>', r`$f(x)=\ln(x)$, $\;f(x)=\log(x)$`, 'Omvendt til eksponentialfunktionen, defineret for x > 0'],
              ['<a href="#/trigfunktioner">Trigonometrisk</a>', r`$f(x)=A\sin(bx+c)+d$`, 'Periodisk svingning'],
            ],
          },
          kw: 'funktionstyper oversigt elementære funktioner',
        },
      ],
    },
  ],
};
