// Tal og algebra: hierarki, parenteser, kvadratsætninger, brøker, potenser, rødder, talmængder og proportionalitet.
const r = String.raw;

export default {
  id: 'regneregler',
  title: 'Regneregler og algebra',
  formula: r`(a+b)^2=a^2+b^2+2ab`,
  desc: 'Regningsarternes hierarki, parenteser, kvadratsætninger, brøker, potenser, rødder, talmængder og proportionalitet.',
  practice: 'tal',
  sections: [
    {
      title: 'Hierarki og parenteser',
      items: [
        {
          id: 'hierarki',
          name: 'Regningsarternes hierarki',
          tex: r`2+3\cdot 4^2=2+3\cdot 16=2+48=50`,
          note: 'Regn i denne rækkefølge: <b>1.</b> parenteser, <b>2.</b> potenser og rødder, <b>3.</b> gange og dividere, <b>4.</b> plus og minus. Regningsarter på samme trin regnes fra venstre mod højre.',
          kw: 'rækkefølge regnearter regneart',
        },
        {
          id: 'gange-ind',
          name: 'Gange ind i en parentes',
          tex: r`a\cdot(b+c)=a\cdot b+a\cdot c`,
          note: 'Læst fra højre mod venstre: sæt en fælles faktor uden for parentes.',
          ex: r`$3(x-4)=3x-12$ og $6x+9=3(2x+3)$`,
          kw: 'faktorisere sætte uden for parentes distributive lov',
        },
        {
          id: 'to-parenteser',
          name: 'Gange to parenteser',
          tex: r`(a+b)\cdot(c+d)=a\cdot c+a\cdot d+b\cdot c+b\cdot d`,
          note: 'Hvert led i den første parentes ganges med hvert led i den anden.',
          ex: r`$(x+2)(x-5)=x^2-5x+2x-10=x^2-3x-10$`,
        },
        {
          id: 'minusparentes',
          name: 'Hæve en minusparentes',
          tex: r`a-(b+c)=a-b-c\qquad a-(b-c)=a-b+c`,
          note: 'Alle fortegn i parentesen skifter. En plusparentes hæves uden ændringer.',
          kw: 'fortegn',
        },
      ],
    },
    {
      title: 'Kvadratsætningerne',
      items: [
        {
          id: 'kvadrat1',
          name: '1. kvadratsætning',
          tex: r`(a+b)^2=a^2+b^2+2ab`,
          note: 'Kvadratet på en sum.',
          ex: r`$(x+3)^2=x^2+9+6x$`,
          kw: 'kvadratsætninger kvadratsætning',
        },
        {
          id: 'kvadrat2',
          name: '2. kvadratsætning',
          tex: r`(a-b)^2=a^2+b^2-2ab`,
          note: 'Kvadratet på en differens.',
          ex: r`$(2x-5)^2=4x^2+25-20x$`,
          kw: 'kvadratsætninger kvadratsætning',
        },
        {
          id: 'kvadrat3',
          name: '3. kvadratsætning',
          tex: r`(a+b)\cdot(a-b)=a^2-b^2`,
          note: 'To tals sum gange de samme to tals differens.',
          ex: r`$x^2-16=(x+4)(x-4)$`,
          kw: 'kvadratsætninger kvadratsætning',
        },
      ],
    },
    {
      title: 'Brøker',
      items: [
        {
          id: 'broeker',
          name: 'Regning med brøker',
          wide: true,
          rows: [
            ['Forlænge og forkorte', r`\frac{a}{b}=\frac{k\cdot a}{k\cdot b}`],
            ['Plus og minus med samme nævner', r`\frac{a}{c}\pm\frac{b}{c}=\frac{a\pm b}{c}`],
            ['Plus og minus med forskellige nævnere', r`\frac{a}{b}\pm\frac{c}{d}=\frac{a\cdot d\pm b\cdot c}{b\cdot d}`],
            ['Tal gange brøk', r`a\cdot\frac{b}{c}=\frac{a\cdot b}{c}`],
            ['Brøk gange brøk', r`\frac{a}{b}\cdot\frac{c}{d}=\frac{a\cdot c}{b\cdot d}`],
            ['Brøk divideret med tal', r`\frac{a}{b}:c=\frac{a}{b\cdot c}`],
            ['Tal divideret med brøk', r`a:\frac{b}{c}=\frac{a\cdot c}{b}`],
            ['Brøk divideret med brøk', r`\frac{a}{b}:\frac{c}{d}=\frac{a\cdot d}{b\cdot c}`],
          ],
          note: 'Man dividerer med en brøk ved at gange med den omvendte brøk. Nævneren må aldrig være 0.',
          ex: r`$\frac{2}{3}+\frac{1}{4}=\frac{2\cdot 4+3\cdot 1}{3\cdot 4}=\frac{11}{12}$ og $\frac{2}{3}:\frac{4}{5}=\frac{2\cdot 5}{3\cdot 4}=\frac{10}{12}=\frac{5}{6}$`,
          kw: 'brøkregler brøkregning fællesnævner tæller nævner',
        },
      ],
    },
    {
      title: 'Potenser og rødder',
      items: [
        {
          id: 'potensregler',
          name: 'Potensregneregler',
          rows: [
            ['Gange potenser med samme grundtal', r`a^n\cdot a^m=a^{n+m}`],
            ['Dividere potenser med samme grundtal', r`\frac{a^n}{a^m}=a^{n-m}`],
            ['Potens af en potens', r`\left(a^n\right)^m=a^{n\cdot m}`],
            ['Potens af et produkt', r`(a\cdot b)^n=a^n\cdot b^n`],
            ['Potens af en brøk', r`\left(\frac{a}{b}\right)^n=\frac{a^n}{b^n}`],
            ['Eksponenten 0', r`a^0=1`],
            ['Negativ eksponent', r`a^{-n}=\frac{1}{a^n}`],
            ['Brøk som eksponent', r`a^{\frac{1}{n}}=\sqrt[n]{a}\qquad a^{\frac{m}{n}}=\sqrt[n]{a^m}`],
          ],
          note: r`Reglerne gælder for $a>0$ og $b>0$. Der er ingen regel for $a^n+a^m$.`,
          ex: r`$x^3\cdot x^4=x^7$, $\;\frac{x^5}{x^2}=x^3$, $\;(2x)^3=8x^3\;$ og $\;9^{\frac{1}{2}}=\sqrt{9}=3$`,
          kw: 'potensregler potensregneregler eksponent grundtal',
        },
        {
          id: 'roedder',
          name: 'Regneregler for rødder',
          rows: [
            ['Rod af et produkt', r`\sqrt{a\cdot b}=\sqrt{a}\cdot\sqrt{b}`],
            ['Rod af en brøk', r`\sqrt{\frac{a}{b}}=\frac{\sqrt{a}}{\sqrt{b}}`],
            ['Rod og kvadrat', r`\left(\sqrt{a}\right)^2=a\qquad\sqrt{a^2}=|a|`],
            ['Den n\'te rod', r`\sqrt[n]{a}=a^{\frac{1}{n}}`],
          ],
          note: r`Der gælder ingen tilsvarende regel for plus: $\sqrt{a+b}\neq\sqrt{a}+\sqrt{b}$.`,
          kw: 'kvadratrod rodregler kubikrod',
        },
        {
          id: 'numerisk',
          name: 'Numerisk værdi',
          tex: r`|a|=\begin{cases}a & \text{hvis } a\geq 0\\ -a & \text{hvis } a<0\end{cases}`,
          note: r`$|a-b|$ er afstanden mellem $a$ og $b$ på tallinjen.`,
          ex: r`$|-7|=7$ og $|3-8|=5$`,
          kw: 'absolut værdi',
        },
      ],
    },
    {
      title: 'Tal og mængder',
      items: [
        {
          id: 'talmaengder',
          name: 'Talmængder',
          rows: [
            ['Naturlige tal', r`\mathbb{N}=\{1,2,3,\dots\}`],
            ['Hele tal', r`\mathbb{Z}=\{\dots,-2,-1,0,1,2,\dots\}`],
            ['Rationale tal (brøker)', r`\mathbb{Q}=\left\{\tfrac{a}{b}\;\middle|\;a,b\in\mathbb{Z},\ b\neq 0\right\}`],
            ['Reelle tal (hele tallinjen)', r`\mathbb{R}`],
          ],
          note: r`$\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}$. Tal som $\sqrt{2}$, $\pi$ og $e$ er irrationale: de er reelle, men kan ikke skrives som en brøk.`,
          kw: 'naturlige hele rationale reelle irrationale tal',
        },
        {
          id: 'intervaller',
          name: 'Intervaller',
          rows: [
            ['Lukket', r`[a;b]:\quad a\leq x\leq b`],
            ['Åbent', r`]a;b[\,:\quad a<x<b`],
            ['Halvåbent', r`[a;b[\,:\quad a\leq x<b`],
            ['Ubegrænset', r`]a;\infty[\,:\quad x>a`],
          ],
          note: 'Klammen vender ind mod tallet, når endepunktet er med, og væk fra tallet, når det ikke er med.',
          kw: 'interval klammer',
        },
        {
          id: 'maengdesymboler',
          name: 'Mængdesymboler',
          rows: [
            ['Tilhører / tilhører ikke', r`x\in A\qquad x\notin A`],
            ['Foreningsmængde (enten–eller)', r`A\cup B`],
            ['Fællesmængde (både–og)', r`A\cap B`],
            ['Mængdedifferens', r`A\setminus B`],
            ['Delmængde', r`A\subseteq B`],
            ['Den tomme mængde', r`\emptyset`],
          ],
          kw: 'mængder mængdelære symboler',
        },
      ],
    },
    {
      title: 'Proportionalitet',
      items: [
        {
          id: 'ligefrem',
          name: 'Ligefrem proportionalitet',
          tex: r`y=k\cdot x`,
          note: r`$k=\frac{y}{x}$ er proportionalitetsfaktoren. Grafen er en ret linje gennem $(0,0)$. Bliver $x$ dobbelt så stor, bliver $y$ også dobbelt så stor.`,
          kw: 'proportional proportionale',
        },
        {
          id: 'omvendt',
          name: 'Omvendt proportionalitet',
          tex: r`y=\frac{k}{x}\quad\Leftrightarrow\quad x\cdot y=k`,
          note: r`Grafen er en hyperbel. Bliver $x$ dobbelt så stor, bliver $y$ halvt så stor.`,
          kw: 'proportional hyperbel',
        },
      ],
    },
  ],
};
