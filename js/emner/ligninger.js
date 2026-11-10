// Ligninger og uligheder.
const r = String.raw;

export default {
  id: 'ligninger',
  title: 'Ligninger og uligheder',
  formula: r`a\cdot b=0\;\Leftrightarrow\;a=0\,\lor\,b=0`,
  desc: 'Omformningsregler, nulreglen, andengradsligninger, potens- og eksponentielle ligninger, to ligninger med to ubekendte og uligheder.',
  practice: 'ligninger',
  sections: [
    {
      title: 'Omformning af ligninger',
      items: [
        {
          id: 'omformning',
          name: 'Omformningsregler',
          rows: [
            ['Læg det samme tal til (eller træk det fra) på begge sider', r`a=b\;\Leftrightarrow\;a+c=b+c`],
            ['Gang (eller dividér) med det samme tal på begge sider', r`a=b\;\Leftrightarrow\;a\cdot c=b\cdot c\quad(c\neq 0)`],
          ],
          note: 'Man må ikke gange eller dividere med 0. Gør altid prøve ved at indsætte løsningen i den oprindelige ligning.',
          kw: 'ligningsløsning isolere regler',
        },
        {
          id: 'foerstegrad',
          name: 'Førstegradsligning',
          tex: r`a\cdot x+b=c\;\Leftrightarrow\;x=\frac{c-b}{a}`,
          note: r`Gælder for $a\neq 0$.`,
          ex: r`$3x+5=20\;\Leftrightarrow\;3x=15\;\Leftrightarrow\;x=5$`,
          kw: 'lineær ligning isolere x',
        },
        {
          id: 'krydsgange',
          name: 'Brøkligning (gange over kors)',
          tex: r`\frac{a}{b}=\frac{c}{d}\;\Leftrightarrow\;a\cdot d=b\cdot c`,
          note: r`Gælder, når $b\neq 0$ og $d\neq 0$.`,
          ex: r`$\frac{x}{4}=\frac{3}{2}\;\Leftrightarrow\;2x=12\;\Leftrightarrow\;x=6$`,
          kw: 'forhold brøk kryds',
        },
        {
          id: 'nulreglen',
          name: 'Nulreglen',
          tex: r`a\cdot b=0\;\Leftrightarrow\;a=0\,\lor\,b=0`,
          note: 'Et produkt er 0, netop når mindst én af faktorerne er 0.',
          ex: r`$(x-2)(x+5)=0\;\Leftrightarrow\;x=2\,\lor\,x=-5$`,
          kw: 'nulregel produkt faktor',
        },
      ],
    },
    {
      title: 'Andengradsligninger',
      items: [
        {
          id: 'andengradsligning',
          name: 'Andengradsligningen',
          tex: [r`a x^2+b x+c=0\quad(a\neq 0)`, r`d=b^2-4ac\qquad x=\frac{-b\pm\sqrt{d}}{2a}`],
          note: r`$d>0$: to løsninger. $\;d=0$: én løsning, $x=-\frac{b}{2a}$. $\;d<0$: ingen løsninger.`,
          ex: r`$2x^2-4x-6=0$: $\;d=(-4)^2-4\cdot 2\cdot(-6)=64$, så $x=\frac{4\pm 8}{4}$, dvs. $x=-1\,\lor\,x=3$.`,
          calc: 'andengrad',
          maple: 'solve(2*x^2 - 4*x - 6 = 0, x)',
          kw: 'diskriminant løsningsformel rødder abc-formel',
        },
        {
          id: 'uden-c',
          name: 'Andengradsligning uden konstantled',
          tex: r`a x^2+b x=0\;\Leftrightarrow\;x\cdot(a x+b)=0\;\Leftrightarrow\;x=0\,\lor\,x=-\frac{b}{a}`,
          note: 'Sæt x uden for parentes, og brug nulreglen.',
        },
        {
          id: 'uden-b',
          name: 'Ligningen x² = k',
          tex: r`x^2=k\;\Leftrightarrow\;x=\pm\sqrt{k}\quad(k\geq 0)`,
          note: r`For $k<0$ er der ingen løsninger. Husk begge fortegn.`,
          ex: r`$x^2=49\;\Leftrightarrow\;x=7\,\lor\,x=-7$`,
          kw: 'kvadratrod plus minus',
        },
      ],
    },
    {
      title: 'Potens-, eksponential- og logaritmeligninger',
      items: [
        {
          id: 'potensligning',
          name: 'Potensligning',
          tex: r`x^a=c\;\Leftrightarrow\;x=c^{\frac{1}{a}}=\sqrt[a]{c}`,
          note: r`Gælder for $x>0$ og $c>0$. Er $a$ et lige helt tal, er $x=-\sqrt[a]{c}$ også en løsning.`,
          ex: r`$x^3=64\;\Leftrightarrow\;x=\sqrt[3]{64}=4$`,
        },
        {
          id: 'eksponentiel-ligning',
          name: 'Eksponentiel ligning',
          tex: r`a^x=c\;\Leftrightarrow\;x=\frac{\log(c)}{\log(a)}=\frac{\ln(c)}{\ln(a)}`,
          note: r`Gælder for $a>0$, $a\neq 1$ og $c>0$. Tag logaritmen på begge sider, og brug $\log(a^x)=x\cdot\log(a)$.`,
          ex: r`$1{,}05^x=2\;\Leftrightarrow\;x=\frac{\log(2)}{\log(1{,}05)}\approx 14{,}21$`,
          kw: 'logaritme isolere eksponent',
        },
        {
          id: 'e-og-ln',
          name: 'Ligninger med e, 10, ln og log',
          rows: [
            ['Naturlig eksponentialfunktion', r`e^x=c\;\Leftrightarrow\;x=\ln(c)`],
            ['Titalspotens', r`10^x=c\;\Leftrightarrow\;x=\log(c)`],
            ['Naturlig logaritme', r`\ln(x)=c\;\Leftrightarrow\;x=e^c`],
            ['Titalslogaritme', r`\log(x)=c\;\Leftrightarrow\;x=10^c`],
          ],
          kw: 'logaritmeligning',
        },
      ],
    },
    {
      title: 'To ligninger med to ubekendte',
      items: [
        {
          id: 'to-ligninger',
          name: 'To ligninger med to ubekendte',
          tex: [
            r`\begin{aligned}a_1x+b_1y&=c_1\\a_2x+b_2y&=c_2\end{aligned}`,
            r`x=\frac{c_1b_2-c_2b_1}{a_1b_2-a_2b_1}\qquad y=\frac{a_1c_2-a_2c_1}{a_1b_2-a_2b_1}`,
          ],
          note: r`Gælder, når $a_1b_2-a_2b_1\neq 0$. I hånden bruges <b>substitution</b> (isolér en ubekendt i den ene ligning, og indsæt i den anden) eller <b>lige store koefficienter</b> (gang ligningerne, så en ubekendt går ud, når de lægges sammen eller trækkes fra hinanden).`,
          ex: r`$x+y=5$ og $x-y=1$: Læg ligningerne sammen: $2x=6$, så $x=3$ og $y=2$.`,
          calc: 'to-ligninger',
          maple: 'solve({x + y = 5, x - y = 1}, {x, y})',
          kw: 'ligningssystem substitution lige store koefficienter determinantmetoden',
        },
        {
          id: 'grafisk',
          name: 'Grafisk løsning',
          tex: r`f(x)=g(x)`,
          note: r`Løsningerne er $x$-koordinaterne til skæringspunkterne mellem graferne for $f$ og $g$. Løsningerne til $f(x)=0$ er nulpunkterne.`,
          maple: ['solve(f(x) = g(x), x)', 'fsolve(f(x) = g(x), x = 0 .. 10)'],
          kw: 'skæringspunkt numerisk fsolve',
        },
      ],
    },
    {
      title: 'Uligheder',
      items: [
        {
          id: 'uligheder',
          name: 'Regneregler for uligheder',
          rows: [
            ['Læg til eller træk fra på begge sider', r`a<b\;\Leftrightarrow\;a+c<b+c`],
            ['Gang eller dividér med et positivt tal', r`a<b\;\Leftrightarrow\;a\cdot c<b\cdot c\quad(c>0)`],
            ['Gang eller dividér med et negativt tal', r`a<b\;\Leftrightarrow\;a\cdot c>b\cdot c\quad(c<0)`],
          ],
          note: 'Ulighedstegnet vendes, når man ganger eller dividerer med et negativt tal.',
          ex: r`$-2x+1<7\;\Leftrightarrow\;-2x<6\;\Leftrightarrow\;x>-3$`,
          kw: 'ulighed ulighedstegn vende',
        },
      ],
    },
  ],
};
