// Potensfunktioner.
const r = String.raw;

export default {
  id: 'potens',
  title: 'Potensfunktioner',
  formula: r`f(x)=b\cdot x^a`,
  desc: 'Forskrift, betydningen af a og b, topunktsformlen og procent–procent-vækst.',
  practice: 'potens',
  sections: [
    {
      title: 'Forskrift og graf',
      items: [
        {
          id: 'forskrift',
          name: 'Forskrift',
          tex: r`f(x)=b\cdot x^a\quad(x>0,\;b>0)`,
          note: r`$b=f(1)$, så grafen går gennem $(1,b)$. $\;a$ er eksponenten.`,
          kw: 'potensfunktion potensvækst',
        },
        {
          id: 'betydning-a',
          name: 'Betydningen af a',
          rows: [
            ['Voksende, stadig hurtigere', r`a>1`],
            ['Ligefrem proportionalitet (ret linje)', r`a=1`],
            ['Voksende, stadig langsommere', r`0<a<1`],
            ['Aftagende', r`a<0`],
            ['Omvendt proportionalitet', r`a=-1`],
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
          tex: r`a=\frac{\log(y_2)-\log(y_1)}{\log(x_2)-\log(x_1)}=\frac{\log\!\left(\frac{y_2}{y_1}\right)}{\log\!\left(\frac{x_2}{x_1}\right)}\qquad b=\frac{y_1}{x_1^{\,a}}`,
          note: r`Grafen går gennem punkterne $(x_1,y_1)$ og $(x_2,y_2)$. Man kan bruge $\ln$ i stedet for $\log$.`,
          ex: r`$(2;12)$ og $(4;48)$: $\;a=\frac{\log(48/12)}{\log(4/2)}=\frac{\log(4)}{\log(2)}=2$ og $b=\frac{12}{2^2}=3$, så $f(x)=3x^2$.`,
          calc: 'topunkt-potens',
          kw: 'to punkter bestem forskrift',
        },
      ],
    },
    {
      title: 'Vækstegenskaber',
      items: [
        {
          id: 'vaekst',
          name: 'Potensvækst',
          tex: r`f(k\cdot x)=k^a\cdot f(x)`,
          note: r`Når $x$ ganges med $k$, ganges $y$ med $k^a$. Lige store <b>procentvise</b> tilvækster i $x$ giver lige store <b>procentvise</b> tilvækster i $y$.`,
          ex: r`$a=3$: Fordobles $x$, ganges $y$ med $2^3=8$.`,
          kw: 'procent procent vækst',
        },
        {
          id: 'procent',
          name: 'Procentvis ændring',
          tex: r`1+r_y=(1+r_x)^a\quad\Leftrightarrow\quad r_y=(1+r_x)^a-1`,
          note: r`$r_x$ er den procentvise ændring i $x$, og $r_y$ er den tilsvarende procentvise ændring i $y$ (begge som decimaltal).`,
          ex: r`$a=2$, og $x$ vokser med $10\,\%$: $\;r_y=1{,}10^2-1=0{,}21=21\,\%$`,
          kw: 'procentvis vækst rx ry',
        },
      ],
    },
    {
      title: 'Ligninger og grafer',
      items: [
        {
          id: 'ligning',
          name: 'Løs en potensligning',
          tex: r`b\cdot x^a=c\;\Leftrightarrow\;x=\left(\frac{c}{b}\right)^{\frac{1}{a}}`,
          ex: r`$3\cdot x^2=75\;\Leftrightarrow\;x=25^{\frac{1}{2}}=5$`,
          kw: 'isolere x',
        },
        {
          id: 'dobbeltlog',
          name: 'Dobbeltlogaritmisk koordinatsystem',
          note: r`Grafen for en potensfunktion er en ret linje med hældningen $a$ i et dobbeltlogaritmisk koordinatsystem, fordi $\log(y)=\log(b)+a\cdot\log(x)$.`,
          kw: 'logaritmisk papir ret linje',
        },
        {
          id: 'afledet',
          name: 'Differentiation og integration',
          rows: [
            ['Afledet funktion', r`\left(x^a\right)'=a\cdot x^{a-1}`],
            ['Stamfunktion', r`\int x^a\,dx=\frac{1}{a+1}\cdot x^{a+1}+k\quad(a\neq -1)`],
          ],
          maple: 'PowReg(X, Y)',
        },
      ],
    },
  ],
};
