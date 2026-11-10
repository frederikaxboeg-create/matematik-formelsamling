// Binomialfordelingen.
const r = String.raw;

export default {
  id: 'binomial',
  title: 'Binomialfordelingen',
  formula: r`P(X=r)=K(n,r)\cdot p^r\cdot(1-p)^{n-r}`,
  desc: 'Binomialforsøg, punktsandsynligheder, kumulerede sandsynligheder, middelværdi og spredning – med binpdf og bincdf i Maple.',
  practice: 'sandsynlighed',
  sections: [
    {
      title: 'Binomialfordelt stokastisk variabel',
      items: [
        {
          id: 'forsoeg',
          name: 'Binomialforsøg',
          tex: r`X\sim\operatorname{Bin}(n,p)`,
          note: r`$X$ er antallet af succeser i $n$ gentagelser af et forsøg, hvor <b>1)</b> hver gentagelse har to mulige udfald (succes eller fiasko), <b>2)</b> sandsynligheden $p$ for succes er den samme hver gang, og <b>3)</b> gentagelserne er uafhængige af hinanden. $\;n$ kaldes antalsparameteren og $p$ sandsynlighedsparameteren. Skrives også $X\sim b(n,p)$.`,
          kw: 'binomialfordelt antalsparameter sandsynlighedsparameter basissandsynlighed succes fiasko',
        },
        {
          id: 'punktsandsynlighed',
          name: 'Binomialsandsynlighed',
          tex: r`P(X=r)=K(n,r)\cdot p^r\cdot(1-p)^{n-r}`,
          note: r`Sandsynligheden for netop $r$ succeser. $K(n,r)$ er antallet af måder, de $r$ succeser kan placeres blandt de $n$ forsøg.`,
          ex: r`$n=10$ og $p=0{,}3$: $\;P(X=4)=K(10,4)\cdot 0{,}3^4\cdot 0{,}7^6=210\cdot 0{,}0081\cdot 0{,}1176\approx 0{,}2001$`,
          calc: 'binomial',
          maple: 'binpdf(10, 0.3, 4)',
          kw: 'punktsandsynlighed netop præcis binpdf',
        },
        {
          id: 'middel-spredning',
          name: 'Middelværdi og spredning',
          tex: r`\mu=n\cdot p\qquad\sigma=\sqrt{n\cdot p\cdot(1-p)}`,
          ex: r`$n=10$ og $p=0{,}3$: $\;\mu=3$ og $\sigma=\sqrt{2{,}1}\approx 1{,}45$`,
          calc: 'binomial',
          kw: 'forventet antal standardafvigelse',
        },
      ],
    },
    {
      title: 'Kumulerede sandsynligheder',
      items: [
        {
          id: 'kumuleret',
          name: 'Højst, mindst og mellem',
          wide: true,
          table: {
            head: ['Formulering', 'Sandsynlighed', 'I Maple'],
            rows: [
              ['Højst r', r`$P(X\leq r)$`, '<code>bincdf(n, p, r)</code>'],
              ['Færre end r', r`$P(X<r)=P(X\leq r-1)$`, '<code>bincdf(n, p, r-1)</code>'],
              ['Mindst r', r`$P(X\geq r)=1-P(X\leq r-1)$`, '<code>1 - bincdf(n, p, r-1)</code>'],
              ['Flere end r', r`$P(X>r)=1-P(X\leq r)$`, '<code>1 - bincdf(n, p, r)</code>'],
              ['Fra a til b', r`$P(a\leq X\leq b)=P(X\leq b)-P(X\leq a-1)$`, '<code>bincdf(n, p, b) - bincdf(n, p, a-1)</code>'],
            ],
          },
          note: r`Den kumulerede sandsynlighed er $P(X\leq r)=P(X=0)+P(X=1)+\dots+P(X=r)$.`,
          ex: r`$n=10$ og $p=0{,}3$: $\;P(X\leq 4)\approx 0{,}8497$ og $P(X\geq 5)=1-0{,}8497=0{,}1503$`,
          calc: 'binomial',
          kw: 'kumuleret højst mindst flere end færre end bincdf',
        },
      ],
    },
    {
      title: 'Normale og exceptionelle udfald',
      items: [
        {
          id: 'normale',
          name: 'Normale og exceptionelle udfald',
          rows: [
            ['Normale udfald', r`\mu-2\sigma\leq x\leq\mu+2\sigma`],
            ['Exceptionelle udfald', r`x<\mu-3\sigma\quad\lor\quad x>\mu+3\sigma`],
          ],
          note: r`Normale udfald ligger højst to spredninger fra middelværdien (ca. $95\,\%$ af sandsynligheden). Exceptionelle udfald ligger mere end tre spredninger fra middelværdien.`,
          ex: r`$n=100$ og $p=0{,}5$: $\;\mu=50$ og $\sigma=5$, så de normale udfald er $40$ til $60$.`,
          kw: 'normale udfald exceptionelle udfald',
        },
      ],
    },
    {
      title: 'Binomialfordelingen i Maple',
      items: [
        {
          id: 'maple',
          name: 'binpdf og bincdf',
          wide: true,
          table: {
            head: ['Kommando', 'Betydning'],
            rows: [
              ['<code>binpdf(n, p, r)</code>', r`$P(X=r)$ – netop $r$ succeser`],
              ['<code>bincdf(n, p, r)</code>', r`$P(X\leq r)$ – højst $r$ succeser`],
            ],
          },
          note: 'Kommandoerne er dem, der står i studieplanen, og de kræver Gym-pakken: skriv <code>with(Gym):</code> først. Husk punktum som decimaltegn.',
          kw: 'maple gym binpdf bincdf',
        },
      ],
    },
  ],
};
