// Andengradspolynomier og polynomier generelt.
const r = String.raw;

export default {
  id: 'andengrad',
  title: 'Andengradspolynomier',
  formula: r`x=\frac{-b\pm\sqrt{d}}{2a}`,
  desc: 'Forskrift, diskriminant, rødder, toppunkt, faktorisering og polynomier generelt.',
  practice: 'andengrads',
  sections: [
    {
      title: 'Forskrift og graf',
      items: [
        {
          id: 'forskrift',
          name: 'Forskrift',
          tex: r`f(x)=a x^2+b x+c\quad(a\neq 0)`,
          note: 'Grafen er en parabel.',
          kw: 'andengradspolynomium parabel',
        },
        {
          id: 'abc',
          name: 'Betydningen af a, b og c',
          rows: [
            ['Grenene vender opad («glad» parabel)', r`a>0`],
            ['Grenene vender nedad («sur» parabel)', r`a<0`],
            ['Skæring med y-aksen', r`(0,\,c)`],
            ['Tangentens hældning i (0, c)', r`b`],
          ],
          note: r`Jo større $|a|$ er, jo smallere er parablen. Har $a$ og $b$ samme fortegn, ligger toppunktet til venstre for $y$-aksen – ellers til højre.`,
          kw: 'koefficienter grene',
        },
      ],
    },
    {
      title: 'Diskriminant og rødder',
      items: [
        {
          id: 'diskriminant',
          name: 'Diskriminanten',
          tex: r`d=b^2-4ac`,
          rows: [
            ['To rødder', r`d>0`],
            ['Én rod (dobbeltrod)', r`d=0`],
            ['Ingen rødder', r`d<0`],
          ],
          ex: r`$f(x)=2x^2-4x-6$: $\;d=(-4)^2-4\cdot 2\cdot(-6)=16+48=64$`,
          calc: 'andengrad',
          kw: 'diskriminantformlen antal løsninger',
        },
        {
          id: 'roedder',
          name: 'Rødder (nulpunkter)',
          tex: r`x=\frac{-b\pm\sqrt{d}}{2a}`,
          note: r`Løsningerne til $ax^2+bx+c=0$ og dermed parablens skæringer med $x$-aksen.`,
          ex: r`$f(x)=2x^2-4x-6$ med $d=64$: $\;x=\frac{4\pm 8}{4}$, dvs. $x=-1\,\lor\,x=3$.`,
          calc: 'andengrad',
          maple: 'solve(2*x^2 - 4*x - 6 = 0, x)',
          kw: 'nulpunkter løsningsformel andengradsligning',
        },
      ],
    },
    {
      title: 'Toppunkt',
      items: [
        {
          id: 'toppunkt',
          name: 'Toppunktsformlen',
          tex: r`T=\left(-\frac{b}{2a},\;-\frac{d}{4a}\right)`,
          note: r`$y$-koordinaten kan også findes som $f\!\left(-\frac{b}{2a}\right)$. For $a>0$ er toppunktet et minimum, og for $a<0$ et maksimum.`,
          ex: r`$f(x)=2x^2-4x-6$: $\;T=\left(\frac{4}{4},\,-\frac{64}{8}\right)=(1;-8)$`,
          calc: 'andengrad',
          kw: 'toppunkt minimum maksimum',
        },
        {
          id: 'symmetriakse',
          name: 'Symmetriakse',
          tex: r`x=-\frac{b}{2a}=\frac{x_1+x_2}{2}`,
          note: 'Parablen er symmetrisk om den lodrette linje gennem toppunktet. Toppunktet ligger midt mellem rødderne.',
        },
        {
          id: 'toppunktsform',
          name: 'Forskrift ud fra toppunktet',
          tex: r`f(x)=a\cdot(x-x_T)^2+y_T`,
          note: r`Parablen $a x^2$ forskudt, så toppunktet ligger i $(x_T,y_T)$.`,
          ex: r`$f(x)=2(x-1)^2-8=2x^2-4x-6$`,
          kw: 'toppunktsform forskydning',
        },
      ],
    },
    {
      title: 'Faktorisering',
      items: [
        {
          id: 'faktorisering',
          name: 'Faktorisering ud fra rødderne',
          tex: r`f(x)=a\cdot(x-x_1)\cdot(x-x_2)`,
          note: r`Gælder, når $d\geq 0$. For $d=0$ er $f(x)=a\cdot(x-x_1)^2$.`,
          ex: r`$2x^2-4x-6=2\cdot(x+1)\cdot(x-3)$`,
          maple: 'factor(2*x^2 - 4*x - 6)',
          kw: 'faktorisere opløse i faktorer',
        },
        {
          id: 'rodsum',
          name: 'Sum og produkt af rødderne',
          extra: true,
          tex: r`x_1+x_2=-\frac{b}{a}\qquad x_1\cdot x_2=\frac{c}{a}`,
          kw: 'vieta',
        },
      ],
    },
    {
      title: 'Polynomier generelt',
      items: [
        {
          id: 'polynomium',
          name: 'Polynomium af grad n',
          tex: r`p(x)=a_n x^n+a_{n-1}x^{n-1}+\dots+a_1x+a_0\quad(a_n\neq 0)`,
          note: r`Et polynomium af grad $n$ har højst $n$ rødder og højst $n-1$ ekstremumssteder. Er $x_1$ en rod, kan $(x-x_1)$ sættes uden for som faktor.`,
          maple: ['solve(x^3 - 6*x^2 + 11*x - 6 = 0, x)', 'factor(x^3 - 6*x^2 + 11*x - 6)'],
          kw: 'tredjegradspolynomium grad rødder',
        },
        {
          id: 'tredjegrad',
          name: 'Tredjegradspolynomium',
          tex: r`f(x)=a x^3+b x^2+c x+d`,
          note: r`Har én, to eller tre rødder. For $a>0$ går grafen fra $-\infty$ til $\infty$, for $a<0$ omvendt.`,
        },
      ],
    },
  ],
};
