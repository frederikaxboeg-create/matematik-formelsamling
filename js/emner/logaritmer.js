// Logaritmer: log (titalslogaritmen) og ln (den naturlige logaritme).
const r = String.raw;

export default {
  id: 'logaritmer',
  title: 'Logaritmer',
  formula: r`\log(a\cdot b)=\log(a)+\log(b)`,
  desc: 'Titalslogaritmen og den naturlige logaritme: definitioner, regneregler, ligninger og grafer.',
  practice: 'funktioner',
  sections: [
    {
      title: 'Definitioner',
      items: [
        {
          id: 'log',
          name: 'Titalslogaritmen',
          tex: r`y=\log(x)\;\Leftrightarrow\;x=10^y`,
          note: r`$\log(x)$ er det tal, $10$ skal opløftes til for at give $x$. Defineret for $x>0$.`,
          ex: r`$\log(1000)=3$, fordi $10^3=1000$. $\;\log(0{,}01)=-2$.`,
          kw: 'log10 titalslogaritme',
        },
        {
          id: 'ln',
          name: 'Den naturlige logaritme',
          tex: r`y=\ln(x)\;\Leftrightarrow\;x=e^y`,
          note: r`$\ln(x)$ er det tal, $e\approx 2{,}71828$ skal opløftes til for at give $x$. Defineret for $x>0$.`,
          kw: 'naturlig logaritme e',
        },
        {
          id: 'omvendte',
          name: 'Logaritmer og potenser ophæver hinanden',
          rows: [
            ['Titalslogaritmen', r`\log\!\left(10^x\right)=x\qquad 10^{\log(x)}=x`],
            ['Den naturlige logaritme', r`\ln\!\left(e^x\right)=x\qquad e^{\ln(x)}=x`],
          ],
          kw: 'omvendt funktion',
        },
        {
          id: 'saerlige',
          name: 'Særlige værdier',
          rows: [
            ['Titalslogaritmen', r`\log(1)=0\qquad\log(10)=1`],
            ['Den naturlige logaritme', r`\ln(1)=0\qquad\ln(e)=1`],
          ],
        },
      ],
    },
    {
      title: 'Regneregler',
      items: [
        {
          id: 'regneregler',
          name: 'Logaritmeregnereglerne',
          rows: [
            ['Logaritmen til et produkt', r`\log(a\cdot b)=\log(a)+\log(b)`],
            ['Logaritmen til en brøk', r`\log\!\left(\frac{a}{b}\right)=\log(a)-\log(b)`],
            ['Logaritmen til en potens', r`\log\!\left(a^x\right)=x\cdot\log(a)`],
            ['Logaritmen til en rod', r`\log\!\left(\sqrt[n]{a}\right)=\frac{1}{n}\cdot\log(a)`],
          ],
          note: r`Gælder for $a>0$ og $b>0$. Præcis de samme regler gælder for $\ln$.`,
          ex: r`$\log(2)+\log(50)=\log(100)=2$ og $\;\ln\!\left(e^3\right)=3\cdot\ln(e)=3$`,
          kw: 'logaritmeregler regneregler',
        },
        {
          id: 'grundtal',
          name: 'Skift af grundtal',
          tex: r`a^x=e^{x\cdot\ln(a)}\qquad\log_a(x)=\frac{\ln(x)}{\ln(a)}=\frac{\log(x)}{\log(a)}`,
          note: r`$\log_a(x)$ er logaritmen med grundtal $a$. Desuden er $\ln(x)=\ln(10)\cdot\log(x)\approx 2{,}3026\cdot\log(x)$.`,
          extra: true,
        },
      ],
    },
    {
      title: 'Ligninger',
      items: [
        {
          id: 'ligninger',
          name: 'Ligninger med logaritmer og potenser',
          rows: [
            ['Eksponentiel ligning', r`a^x=c\;\Leftrightarrow\;x=\frac{\log(c)}{\log(a)}`],
            ['Med e', r`e^x=c\;\Leftrightarrow\;x=\ln(c)`],
            ['Titalslogaritme', r`\log(x)=c\;\Leftrightarrow\;x=10^c`],
            ['Naturlig logaritme', r`\ln(x)=c\;\Leftrightarrow\;x=e^c`],
          ],
          ex: r`$5\cdot e^{0{,}2x}=40\;\Leftrightarrow\;e^{0{,}2x}=8\;\Leftrightarrow\;x=\frac{\ln(8)}{0{,}2}\approx 10{,}40$`,
          kw: 'logaritmeligning eksponentiel ligning',
        },
      ],
    },
    {
      title: 'Graf og egenskaber',
      items: [
        {
          id: 'graf',
          name: 'Egenskaber',
          note: r`Både $\log$ og $\ln$ har $\Dm=\,]0;\infty[$ og $\Vm=\mathbb{R}$. De er voksende, går gennem $(1,0)$ og har $y$-aksen som lodret asymptote. Graferne er spejlbilleder af $10^x$ og $e^x$ i linjen $y=x$.`,
          kw: 'asymptote voksende',
        },
        {
          id: 'afledet',
          name: 'Differentiation og integration',
          rows: [
            ['Afledet funktion', r`\big(\ln(x)\big)'=\frac{1}{x}`],
            ['Stamfunktion', r`\int\ln(x)\,dx=x\cdot\ln(x)-x+k`],
            ['Stamfunktion til 1/x', r`\int\frac{1}{x}\,dx=\ln|x|+k`],
          ],
        },
        {
          id: 'anvendelser',
          name: 'Logaritmiske skalaer',
          extra: true,
          rows: [
            ['pH-værdi', r`\text{pH}=-\log\!\left([\text{H}_3\text{O}^+]\right)`],
            ['Lydstyrke i decibel', r`L=10\cdot\log\!\left(\frac{I}{I_0}\right)`],
          ],
          note: r`Hver gang koncentrationen bliver 10 gange så stor, falder pH med 1. Hver gang intensiteten bliver 10 gange så stor, vokser lydstyrken med 10 dB.`,
          kw: 'ph decibel richter',
        },
      ],
    },
  ],
};
