// Statistik: estimation, konfidensintervaller og binomialtest.
const r = String.raw;

export default {
  id: 'hypotesetest',
  title: 'Hypotesetest og konfidensinterval',
  formula: r`\hat{p}\pm 1{,}96\cdot\sqrt{\frac{\hat{p}\cdot(1-\hat{p})}{n}}`,
  desc: 'Estimat af en andel, konfidensinterval, nulhypotese og alternativ hypotese, signifikansniveau, kritisk mængde og p-værdi i binomialtest.',
  practice: 'hypotesetest',
  sections: [
    {
      title: 'Estimation',
      items: [
        {
          id: 'estimat',
          name: 'Estimat for en sandsynlighed',
          tex: r`\hat{p}=\frac{x}{n}`,
          note: r`I en stikprøve på $n$ er der $x$ med den undersøgte egenskab. $\hat{p}$ er stikprøveandelen og det bedste bud på populationens ukendte andel $p$.`,
          ex: r`$120$ ud af $400$ adspurgte svarer ja: $\;\hat{p}=\frac{120}{400}=0{,}30$`,
          calc: 'konfidens',
          kw: 'stikprøve andel population estimere basissandsynlighed',
        },
        {
          id: 'konfidensinterval',
          name: '95 %-konfidensinterval for en andel',
          tex: r`\left[\hat{p}-1{,}96\cdot\sqrt{\frac{\hat{p}\cdot(1-\hat{p})}{n}}\;;\;\hat{p}+1{,}96\cdot\sqrt{\frac{\hat{p}\cdot(1-\hat{p})}{n}}\right]`,
          note: r`Med ca. $95\,\%$ sikkerhed ligger populationens andel $p$ i intervallet. Nogle bøger runder $1{,}96$ op til $2$. En fire gange så stor stikprøve halverer intervallets bredde.`,
          ex: r`$\hat{p}=0{,}30$ og $n=400$: $\;1{,}96\cdot\sqrt{\frac{0{,}30\cdot 0{,}70}{400}}\approx 0{,}045$, så intervallet er $[0{,}255\,;0{,}345]$.`,
          calc: 'konfidens',
          kw: 'konfidensinterval statistisk usikkerhed stikprøveusikkerhed',
        },
      ],
    },
    {
      title: 'Binomialtest',
      items: [
        {
          id: 'hypoteser',
          name: 'Nulhypotese og alternativ hypotese',
          rows: [
            ['Nulhypotese', r`H_0:\;p=p_0`],
            ['Tosidet alternativ hypotese', r`H_1:\;p\neq p_0`],
            ['Ensidet alternativ hypotese', r`H_1:\;p<p_0\quad\text{eller}\quad H_1:\;p>p_0`],
          ],
          note: r`Nulhypotesen er den påstand, der testes. Under $H_0$ er antallet af succeser i stikprøven binomialfordelt: $X\sim\operatorname{Bin}(n,p_0)$, og det forventede antal er $n\cdot p_0$.`,
          kw: 'nulhypotese alternativ hypotese ensidet tosidet',
        },
        {
          id: 'signifikans',
          name: 'Signifikansniveau',
          tex: r`\alpha=5\,\%`,
          note: r`Signifikansniveauet er den risiko, man accepterer for at forkaste en sand nulhypotese. Det vælges, før testen udføres – oftest $5\,\%$.`,
          kw: 'signifikansniveau alfa',
        },
        {
          id: 'kritisk',
          name: 'Kritisk mængde og acceptmængde',
          rows: [
            ['Venstresidet test: kritisk mængde {0, …, k}', r`P(X\leq k)\leq\alpha`],
            ['Højresidet test: kritisk mængde {k, …, n}', r`P(X\geq k)\leq\alpha`],
            ['Tosidet test: begge haler', r`P(X\leq k_1)\leq\frac{\alpha}{2}\quad\text{og}\quad P(X\geq k_2)\leq\frac{\alpha}{2}`],
          ],
          note: r`Den <b>kritiske mængde</b> er de udfald, der er så usandsynlige under $H_0$, at hypotesen forkastes. Vælg den størst mulige kritiske mængde, der overholder uligheden. Resten af udfaldene er <b>acceptmængden</b>. Ligger observationen i den kritiske mængde, forkastes $H_0$.`,
          ex: r`$H_0:\;p=0{,}5$, $n=20$, tosidet test med $\alpha=5\,\%$: $\;P(X\leq 5)\approx 0{,}021\leq 0{,}025$, men $P(X\leq 6)\approx 0{,}058$. Den kritiske mængde er $\{0,\dots,5\}\cup\{15,\dots,20\}$, og acceptmængden er $\{6,\dots,14\}$.`,
          maple: ['bincdf(20, 0.5, 5)', '1 - bincdf(20, 0.5, 14)'],
          kw: 'kritisk område acceptområde forkaste',
        },
        {
          id: 'p-vaerdi',
          name: 'p-værdi',
          rows: [
            ['Venstresidet test', r`p\text{-værdi}=P(X\leq x)`],
            ['Højresidet test', r`p\text{-værdi}=P(X\geq x)=1-P(X\leq x-1)`],
            ['Konklusion', r`p\text{-værdi}<\alpha\;\Rightarrow\;H_0\text{ forkastes}`],
          ],
          note: r`p-værdien er sandsynligheden for – hvis $H_0$ er sand – at få den observerede værdi $x$ eller noget endnu mere ekstremt. Ved en tosidet test sammenlignes hver hales sandsynlighed med $\frac{\alpha}{2}$.`,
          ex: r`$H_0:\;p=0{,}5$, $H_1:\;p>0{,}5$, $n=20$ og $x=15$: $\;P(X\geq 15)=1-P(X\leq 14)\approx 0{,}021<0{,}05$, så $H_0$ forkastes.`,
          calc: 'binomial',
          kw: 'p-værdi testsandsynlighed',
        },
        {
          id: 'fejl',
          name: 'Fejl af type 1 og type 2',
          rows: [
            ['Fejl af type 1', r`H_0\text{ forkastes, selvom den er sand}`],
            ['Fejl af type 2', r`H_0\text{ accepteres, selvom den er falsk}`],
          ],
          note: r`Sandsynligheden for en fejl af type 1 er højst signifikansniveauet $\alpha$. At $H_0$ ikke forkastes, beviser ikke, at den er sand.`,
          kw: 'type 1 fejl type 2 fejl',
        },
        {
          id: 'fremgangsmaade',
          name: 'Fremgangsmåde',
          note: r`<b>1)</b> Opstil $H_0$ og $H_1$. <b>2)</b> Vælg signifikansniveau $\alpha$. <b>3)</b> Angiv fordelingen under $H_0$: $X\sim\operatorname{Bin}(n,p_0)$. <b>4)</b> Bestem den kritiske mængde – eller beregn p-værdien for observationen. <b>5)</b> Konkludér: forkast $H_0$ eller ej, og svar i sammenhængen.`,
          kw: 'opskrift trin test',
        },
      ],
    },
  ],
};
