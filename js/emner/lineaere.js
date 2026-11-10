// Lineære funktioner.
const r = String.raw;

export default {
  id: 'lineaere',
  title: 'Lineære funktioner',
  formula: r`f(x)=ax+b`,
  desc: 'Forskrift, hældningskoefficient, topunktsformlen, nulpunkt, skæring og lineær vækst.',
  practice: 'lineaere',
  sections: [
    {
      title: 'Forskrift og graf',
      items: [
        {
          id: 'forskrift',
          name: 'Forskrift',
          tex: r`f(x)=a\cdot x+b`,
          note: r`$a$ er hældningskoefficienten: når $x$ vokser med 1, vokser $y$ med $a$. $\;b$ er skæringen med $y$-aksen, dvs. grafen går gennem $(0,b)$. Grafen er en ret linje.`,
          kw: 'lineær funktion ret linje hældningskoefficient',
        },
        {
          id: 'fortegn-a',
          name: 'Betydningen af a',
          rows: [
            ['Voksende', r`a>0`],
            ['Konstant (vandret linje)', r`a=0`],
            ['Aftagende', r`a<0`],
          ],
        },
      ],
    },
    {
      title: 'Bestem a og b',
      items: [
        {
          id: 'topunkt',
          name: 'Topunktsformlen',
          tex: r`a=\frac{y_2-y_1}{x_2-x_1}\qquad b=y_1-a\cdot x_1`,
          note: r`Linjen går gennem punkterne $(x_1,y_1)$ og $(x_2,y_2)$.`,
          ex: r`$(2;3)$ og $(6;11)$: $\;a=\frac{11-3}{6-2}=2$ og $b=3-2\cdot 2=-1$, så $f(x)=2x-1$.`,
          calc: 'topunkt-lin',
          kw: 'to punkter hældning bestem forskrift',
        },
        {
          id: 'punkt-haeldning',
          name: 'Linje gennem et punkt med kendt hældning',
          tex: r`y=a\cdot(x-x_1)+y_1`,
          ex: r`Hældning $3$ gennem $(2;5)$: $\;y=3(x-2)+5=3x-1$`,
          kw: 'punkt hældning formel',
        },
      ],
    },
    {
      title: 'Egenskaber',
      items: [
        {
          id: 'vaekst',
          name: 'Lineær vækst',
          tex: r`f(x+h)=f(x)+a\cdot h\qquad\Delta y=a\cdot\Delta x`,
          note: r`Lige store tilvækster i $x$ giver lige store tilvækster i $y$.`,
          kw: 'absolut vækst tilvækst',
        },
        {
          id: 'nulpunkt',
          name: 'Nulpunkt',
          tex: r`a x+b=0\;\Leftrightarrow\;x=-\frac{b}{a}`,
          note: r`Grafens skæring med $x$-aksen (for $a\neq 0$).`,
        },
        {
          id: 'skaering',
          name: 'Skæring mellem to linjer',
          tex: r`a_1x+b_1=a_2x+b_2\;\Leftrightarrow\;x=\frac{b_2-b_1}{a_1-a_2}`,
          note: r`Indsæt $x$ i en af forskrifterne for at finde $y$.`,
          kw: 'skæringspunkt',
        },
        {
          id: 'model',
          name: 'Lineær model',
          note: r`I en lineær model $y=ax+b$ er $b$ begyndelsesværdien (værdien for $x=0$), og $a$ er den faste ændring i $y$ pr. enhed i $x$. For $b=0$ er $y$ ligefrem proportional med $x$.`,
          maple: 'LinReg(X, Y)',
          kw: 'begyndelsesværdi fortolkning af a og b',
        },
      ],
    },
  ],
};
