// Eksponentielle funktioner.
const r = String.raw;

export default {
  id: 'eksponentielle',
  title: 'Eksponentielle funktioner',
  formula: r`f(x)=b\cdot a^x`,
  desc: 'Forskrift, fremskrivningsfaktor og vækstrate, topunktsformlen, fordoblings- og halveringskonstant og den naturlige eksponentialfunktion.',
  practice: 'eksponentielle',
  sections: [
    {
      title: 'Forskrift og graf',
      items: [
        {
          id: 'forskrift',
          name: 'Forskrift',
          tex: r`f(x)=b\cdot a^x\quad(a>0,\;b>0)`,
          note: r`$b$ er begyndelsesværdien $f(0)$, og $a$ er fremskrivningsfaktoren: hver gang $x$ vokser med 1, ganges $y$ med $a$.`,
          kw: 'eksponentiel funktion begyndelsesværdi fremskrivningsfaktor',
        },
        {
          id: 'voksende-aftagende',
          name: 'Voksende eller aftagende',
          rows: [
            ['Voksende', r`a>1`],
            ['Aftagende', r`0<a<1`],
          ],
          note: r`$\Dm(f)=\mathbb{R}$ og $\Vm(f)=\,]0;\infty[$. Grafen skærer $y$-aksen i $(0,b)$ og har $x$-aksen som vandret asymptote.`,
          kw: 'asymptote',
        },
        {
          id: 'vaekstrate',
          name: 'Vækstrate',
          tex: r`r=a-1\qquad a=1+r`,
          note: r`$r$ er den procentvise ændring i $y$, når $x$ vokser med 1.`,
          ex: r`$a=1{,}08$ svarer til en vækst på $8\,\%$. $\;a=0{,}85$ svarer til et fald på $15\,\%$.`,
          kw: 'procentvis vækst vækstrate',
        },
        {
          id: 'e-form',
          name: 'Skrevet med e',
          tex: r`f(x)=b\cdot e^{k x}\qquad k=\ln(a)\qquad a=e^k`,
          note: r`$k>0$ giver voksende funktion, og $k<0$ giver aftagende. $e\approx 2{,}71828$ er grundtallet for den naturlige eksponentialfunktion.`,
          kw: 'naturlige eksponentialfunktion e vækstkonstant',
        },
      ],
    },
    {
      title: 'Bestem a og b',
      items: [
        {
          id: 'topunkt',
          name: 'Topunktsformlen',
          tex: r`a=\sqrt[x_2-x_1]{\frac{y_2}{y_1}}=\left(\frac{y_2}{y_1}\right)^{\frac{1}{x_2-x_1}}\qquad b=\frac{y_1}{a^{x_1}}`,
          note: r`Grafen går gennem punkterne $(x_1,y_1)$ og $(x_2,y_2)$.`,
          ex: r`$(1;6)$ og $(4;48)$: $\;a=\sqrt[3]{\frac{48}{6}}=2$ og $b=\frac{6}{2^1}=3$, så $f(x)=3\cdot 2^x$.`,
          calc: 'topunkt-eksp',
          kw: 'to punkter bestem forskrift',
        },
      ],
    },
    {
      title: 'Vækstegenskaber',
      items: [
        {
          id: 'vaekst',
          name: 'Eksponentiel vækst',
          tex: r`f(x+h)=f(x)\cdot a^h`,
          note: r`Lige store tilvækster i $x$ giver lige store <b>procentvise</b> tilvækster i $y$. Når $x$ vokser med $h$, ganges $y$ med $a^h$.`,
          ex: r`$a=1{,}05$: Efter 10 enheder er $y$ ganget med $1{,}05^{10}\approx 1{,}629$, dvs. vokset med $62{,}9\,\%$.`,
          kw: 'procentvis vækst',
        },
        {
          id: 'fordobling',
          name: 'Fordoblingskonstant',
          tex: r`T_2=\frac{\ln(2)}{\ln(a)}=\frac{\log(2)}{\log(a)}=\frac{\ln(2)}{k}`,
          note: r`Den tilvækst i $x$, der fordobler $y$. Gælder for voksende funktioner ($a>1$).`,
          ex: r`$a=1{,}05$: $\;T_2=\frac{\ln(2)}{\ln(1{,}05)}\approx 14{,}21$`,
          calc: 'fordobling',
          kw: 'fordoblingstid',
        },
        {
          id: 'halvering',
          name: 'Halveringskonstant',
          tex: r`T_{\frac{1}{2}}=\frac{\ln\!\left(\frac{1}{2}\right)}{\ln(a)}=\frac{\log\!\left(\frac{1}{2}\right)}{\log(a)}=-\frac{\ln(2)}{k}`,
          note: r`Den tilvækst i $x$, der halverer $y$. Gælder for aftagende funktioner ($0<a<1$).`,
          ex: r`$a=0{,}90$: $\;T_{\frac{1}{2}}=\frac{\ln(0{,}5)}{\ln(0{,}90)}\approx 6{,}58$`,
          calc: 'fordobling',
          kw: 'halveringstid',
        },
        {
          id: 'a-fra-t',
          name: 'Fremskrivningsfaktoren ud fra konstanten',
          tex: r`a=2^{\frac{1}{T_2}}\qquad a=\left(\tfrac{1}{2}\right)^{\frac{1}{T_{1/2}}}`,
        },
      ],
    },
    {
      title: 'Ligninger og grafer',
      items: [
        {
          id: 'ligning',
          name: 'Løs en eksponentiel ligning',
          tex: r`b\cdot a^x=c\;\Leftrightarrow\;x=\frac{\log\!\left(\frac{c}{b}\right)}{\log(a)}`,
          ex: r`$3\cdot 2^x=96\;\Leftrightarrow\;x=\frac{\log(32)}{\log(2)}=5$`,
          maple: 'solve(3*2^x = 96, x)',
          kw: 'isolere x eksponent logaritme',
        },
        {
          id: 'enkeltlog',
          name: 'Enkeltlogaritmisk koordinatsystem',
          note: r`Grafen for en eksponentiel funktion er en ret linje i et enkeltlogaritmisk koordinatsystem (logaritmisk $y$-akse), fordi $\log(y)=\log(b)+x\cdot\log(a)$.`,
          kw: 'logaritmisk papir ret linje',
        },
        {
          id: 'afledet',
          name: 'Differentiation og integration',
          rows: [
            ['Afledet funktion', r`\left(a^x\right)'=a^x\cdot\ln(a)\qquad\left(e^{kx}\right)'=k\cdot e^{kx}`],
            ['Stamfunktion', r`\int a^x\,dx=\frac{a^x}{\ln(a)}+k\qquad\int e^{cx}\,dx=\frac{1}{c}\cdot e^{cx}+k`],
          ],
          maple: 'ExpReg(X, Y)',
        },
      ],
    },
  ],
};
