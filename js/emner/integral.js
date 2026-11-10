// Integralregning.
const r = String.raw;

export default {
  id: 'integral',
  title: 'Integralregning',
  formula: r`\int_a^b f(x)\,dx=F(b)-F(a)`,
  desc: 'Stamfunktioner, ubestemte og bestemte integraler, regneregler, arealer, substitution og omdrejningslegemer.',
  practice: 'integral',
  sections: [
    {
      title: 'Stamfunktioner',
      items: [
        {
          id: 'stamfunktion',
          name: 'Stamfunktion',
          tex: r`F'(x)=f(x)`,
          note: r`$F$ er en stamfunktion til $f$, hvis $F$ differentieret giver $f$. Er $F$ en stamfunktion, er samtlige stamfunktioner $F(x)+k$, hvor $k$ er en konstant. Tjek altid ved at differentiere.`,
          kw: 'stamfunktion definition integrationskonstant',
        },
        {
          id: 'tabel',
          name: 'Stamfunktioner til de elementære funktioner',
          wide: true,
          table: {
            head: [r`$f(x)$`, r`$F(x)$`, r`$f(x)$`, r`$F(x)$`],
            rows: [
              [r`$k$ (konstant)`, r`$k\cdot x$`, r`$e^x$`, r`$e^x$`],
              [r`$x$`, r`$\tfrac{1}{2}x^2$`, r`$e^{kx}$`, r`$\dfrac{1}{k}\cdot e^{kx}$`],
              [r`$x^n\;\;(n\neq -1)$`, r`$\dfrac{1}{n+1}\cdot x^{n+1}$`, r`$a^x$`, r`$\dfrac{a^x}{\ln(a)}$`],
              [r`$\dfrac{1}{x}$`, r`$\ln|x|$`, r`$\ln(x)$`, r`$x\cdot\ln(x)-x$`],
              [r`$\dfrac{1}{x^2}$`, r`$-\dfrac{1}{x}$`, r`$\sin(x)$`, r`$-\cos(x)$`],
              [r`$\sqrt{x}$`, r`$\tfrac{2}{3}\cdot x^{\frac{3}{2}}$`, r`$\cos(x)$`, r`$\sin(x)$`],
            ],
          },
          note: r`Læg altid en konstant $k$ til for at få alle stamfunktioner. For $x>0$ er $\ln|x|=\ln(x)$.`,
          maple: 'int(x^3 - 2*x, x)',
          kw: 'integrere tabel stamfunktioner',
        },
        {
          id: 'gennem-punkt',
          name: 'Stamfunktionen gennem et punkt',
          tex: r`F(x_0)=y_0`,
          note: r`Bestem først $F(x)+k$, indsæt punktet $(x_0,y_0)$, og løs ligningen for $k$.`,
          ex: r`$f(x)=2x$ og punktet $(1;5)$: $\;F(x)=x^2+k$ og $1^2+k=5$ giver $k=4$, så $F(x)=x^2+4$.`,
          kw: 'bestem k konstant punkt',
        },
      ],
    },
    {
      title: 'Ubestemt integral',
      items: [
        {
          id: 'ubestemt',
          name: 'Ubestemt integral',
          tex: r`\int f(x)\,dx=F(x)+k`,
          note: r`Det ubestemte integral er samtlige stamfunktioner til $f$. $f$ kaldes integranden.`,
          ex: r`$\int\left(3x^2+2x\right)dx=x^3+x^2+k$`,
          kw: 'integral integrand',
        },
        {
          id: 'regneregler',
          name: 'Regneregler',
          rows: [
            ['Sum', r`\int\big(f(x)+g(x)\big)\,dx=\int f(x)\,dx+\int g(x)\,dx`],
            ['Differens', r`\int\big(f(x)-g(x)\big)\,dx=\int f(x)\,dx-\int g(x)\,dx`],
            ['Konstant gange funktion', r`\int k\cdot f(x)\,dx=k\cdot\int f(x)\,dx`],
          ],
          note: 'Man integrerer led for led. Der er ingen simpel regel for produkter og brøker.',
          kw: 'sumregel ledvis integration',
        },
        {
          id: 'lineaer-indre',
          name: 'Lineær indre funktion',
          tex: r`\int f(ax+b)\,dx=\frac{1}{a}\cdot F(ax+b)+k`,
          ex: r`$\int(3x+1)^4\,dx=\frac{1}{3}\cdot\frac{1}{5}(3x+1)^5+k=\frac{1}{15}(3x+1)^5+k$`,
        },
      ],
    },
    {
      title: 'Bestemt integral',
      items: [
        {
          id: 'bestemt',
          name: 'Bestemt integral',
          tex: r`\int_a^b f(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a)`,
          note: r`$a$ er den nedre grænse, og $b$ er den øvre. Resultatet er et tal.`,
          ex: r`$\int_1^3 2x\,dx=\big[x^2\big]_1^3=9-1=8$`,
          maple: 'int(2*x, x = 1 .. 3)',
          kw: 'grænser integralregningens hovedsætning',
        },
        {
          id: 'bestemt-regler',
          name: 'Regneregler for bestemte integraler',
          rows: [
            ['Indskudsreglen', r`\int_a^b f(x)\,dx+\int_b^c f(x)\,dx=\int_a^c f(x)\,dx`],
            ['Byt grænserne', r`\int_b^a f(x)\,dx=-\int_a^b f(x)\,dx`],
            ['Ens grænser', r`\int_a^a f(x)\,dx=0`],
            ['Sum og konstant', r`\int_a^b\big(k\cdot f(x)+g(x)\big)\,dx=k\int_a^b f(x)\,dx+\int_a^b g(x)\,dx`],
          ],
          kw: 'indskudsreglen',
        },
      ],
    },
    {
      title: 'Arealer',
      items: [
        {
          id: 'areal-under',
          name: 'Areal mellem graf og x-akse',
          rows: [
            ['Grafen ligger over x-aksen', r`A=\int_a^b f(x)\,dx\quad\big(f(x)\geq 0\big)`],
            ['Grafen ligger under x-aksen', r`A=-\int_a^b f(x)\,dx\quad\big(f(x)\leq 0\big)`],
          ],
          note: r`Skifter $f$ fortegn i intervallet, deles der op ved nulpunkterne, og arealerne lægges sammen.`,
          ex: r`$f(x)=x^2$ fra $0$ til $3$: $\;A=\big[\tfrac{1}{3}x^3\big]_0^3=9$`,
          kw: 'areal under graf punktmængde',
        },
        {
          id: 'areal-mellem',
          name: 'Areal mellem to grafer',
          tex: r`A=\int_a^b\big(f(x)-g(x)\big)\,dx\quad\big(f(x)\geq g(x)\big)`,
          note: r`Øverste funktion minus nederste. Grænserne $a$ og $b$ er ofte skæringspunkterne, som findes ved at løse $f(x)=g(x)$.`,
          ex: r`$f(x)=x$ og $g(x)=x^2$ skærer hinanden i $x=0$ og $x=1$: $\;A=\int_0^1\left(x-x^2\right)dx=\tfrac{1}{2}-\tfrac{1}{3}=\tfrac{1}{6}$`,
          kw: 'areal mellem grafer afgrænset område',
        },
        {
          id: 'arealfunktion',
          name: 'Arealfunktionen',
          tex: r`A(x)=\int_a^x f(t)\,dt\qquad A'(x)=f(x)`,
          note: r`Arealfunktionen er en stamfunktion til $f$ – det er sammenhængen mellem areal og stamfunktion.`,
          kw: 'sammenhæng areal stamfunktion',
        },
      ],
    },
    {
      title: 'Integration ved substitution',
      items: [
        {
          id: 'substitution',
          name: 'Substitution (ubestemt)',
          tex: r`\int f\big(g(x)\big)\cdot g'(x)\,dx=\int f(t)\,dt\qquad t=g(x)`,
          note: r`Sæt $t=g(x)$ (den indre funktion), så $dt=g'(x)\,dx$. Integrér med hensyn til $t$, og indsæt $g(x)$ igen til sidst.`,
          ex: r`$\int 2x\cdot e^{x^2}\,dx$: Sæt $t=x^2$, så $dt=2x\,dx$. Så er $\int e^t\,dt=e^t+k=e^{x^2}+k$.`,
          kw: 'substitutionsmetoden indre funktion',
        },
        {
          id: 'substitution-bestemt',
          name: 'Substitution (bestemt)',
          tex: r`\int_a^b f\big(g(x)\big)\cdot g'(x)\,dx=\int_{g(a)}^{g(b)}f(t)\,dt`,
          note: 'Husk at ændre grænserne, når variablen skiftes.',
          ex: r`$\int_0^2 2x\cdot\left(x^2+1\right)^3dx=\int_1^5 t^3\,dt=\big[\tfrac{1}{4}t^4\big]_1^5=156$`,
        },
        {
          id: 'partiel',
          name: 'Partiel integration',
          extra: true,
          tex: r`\int f(x)\cdot g(x)\,dx=F(x)\cdot g(x)-\int F(x)\cdot g'(x)\,dx`,
          note: 'Bruges på produkter, hvor den ene faktor bliver simplere, når den differentieres.',
          ex: r`$\int e^x\cdot x\,dx=e^x\cdot x-\int e^x\cdot 1\,dx=e^x\cdot x-e^x+k$`,
          kw: 'delvis integration',
        },
      ],
    },
    {
      title: 'Anvendelser',
      items: [
        {
          id: 'omdrejning',
          name: 'Rumfang af omdrejningslegeme (om x-aksen)',
          tex: r`V=\pi\cdot\int_a^b f(x)^2\,dx`,
          note: r`Legemet fremkommer, når området mellem grafen og $x$-aksen i $[a;b]$ drejes $360^\circ$ om $x$-aksen.`,
          ex: r`$f(x)=\sqrt{x}$ fra $0$ til $4$: $\;V=\pi\int_0^4 x\,dx=\pi\cdot\big[\tfrac{1}{2}x^2\big]_0^4=8\pi\approx 25{,}13$`,
          maple: 'Pi*int(sqrt(x)^2, x = 0 .. 4)',
          kw: 'omdrejningslegeme volumen rotation',
        },
        {
          id: 'omdrejning-mellem',
          name: 'Omdrejningslegeme mellem to grafer',
          tex: r`V=\pi\cdot\int_a^b\big(f(x)^2-g(x)^2\big)\,dx\quad\big(f(x)\geq g(x)\geq 0\big)`,
          note: r`Bemærk: kvadrér hver funktion for sig – ikke differensen.`,
          kw: 'hult omdrejningslegeme ring',
        },
        {
          id: 'omdrejning-y',
          name: 'Omdrejning om y-aksen',
          extra: true,
          tex: r`V=2\pi\cdot\int_a^b x\cdot f(x)\,dx\quad\big(0\leq a<b,\;f(x)\geq 0\big)`,
        },
        {
          id: 'kurvelaengde',
          name: 'Kurvelængde',
          extra: true,
          tex: r`L=\int_a^b\sqrt{1+f'(x)^2}\,dx`,
          note: r`Længden af grafen for $f$ fra $x=a$ til $x=b$.`,
          kw: 'buelængde graflængde',
        },
        {
          id: 'middelvaerdi',
          name: 'Middelværdi af en funktion',
          extra: true,
          tex: r`\bar{f}=\frac{1}{b-a}\cdot\int_a^b f(x)\,dx`,
          kw: 'gennemsnit funktion',
        },
        {
          id: 'samlet-aendring',
          name: 'Samlet ændring ud fra væksthastigheden',
          tex: r`\int_a^b f'(x)\,dx=f(b)-f(a)`,
          note: r`Integralet af en væksthastighed giver den samlede ændring. Eksempel: integralet af en hastighed $v(t)$ er den tilbagelagte strækning.`,
          kw: 'hastighed strækning akkumuleret',
        },
      ],
    },
  ],
};
