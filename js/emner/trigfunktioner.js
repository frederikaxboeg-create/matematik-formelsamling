// Trigonometriske funktioner: radianer, sinus og cosinus som funktioner, harmoniske svingninger.
const r = String.raw;

export default {
  id: 'trigfunktioner',
  title: 'Trigonometriske funktioner',
  formula: r`f(x)=A\sin(bx+c)+d`,
  desc: 'Radianer, sinus og cosinus som funktioner, harmoniske svingninger, trigonometriske ligninger samt differentiation og integration.',
  practice: 'trigfunktioner',
  sections: [
    {
      title: 'Radianer',
      items: [
        {
          id: 'radianer',
          name: 'Grader og radianer',
          tex: r`v_{\text{rad}}=v_{\text{grader}}\cdot\frac{\pi}{180^\circ}\qquad v_{\text{grader}}=v_{\text{rad}}\cdot\frac{180^\circ}{\pi}`,
          note: r`$180^\circ=\pi$ og $360^\circ=2\pi$. Radiantallet er buelængden på enhedscirklen. Trigonometriske funktioner regnes altid i radianer.`,
          ex: r`$60^\circ=60\cdot\frac{\pi}{180}=\frac{\pi}{3}\approx 1{,}047$`,
          calc: 'radian',
          kw: 'radian omregning grader',
        },
        {
          id: 'bue',
          name: 'Buelængde',
          tex: r`b=r\cdot v`,
          note: r`Buelængden på en cirkel med radius $r$ ud for centervinklen $v$, målt i radianer.`,
          extra: true,
        },
      ],
    },
    {
      title: 'Sinus og cosinus som funktioner',
      items: [
        {
          id: 'egenskaber',
          name: 'Grundlæggende egenskaber',
          rows: [
            ['Definitions- og værdimængde', r`\Dm=\mathbb{R}\qquad\Vm=[-1;1]`],
            ['Periode', r`\sin(x+2\pi)=\sin(x)\qquad\cos(x+2\pi)=\cos(x)`],
            ['Modsat fortegn', r`\sin(-x)=-\sin(x)\qquad\cos(-x)=\cos(x)`],
            ['Spejling om π/2', r`\sin(\pi-x)=\sin(x)\qquad\cos(\pi-x)=-\cos(x)`],
            ['Sammenhæng', r`\cos(x)=\sin\!\left(x+\frac{\pi}{2}\right)\qquad\sin\!\left(\frac{\pi}{2}-x\right)=\cos(x)`],
          ],
          note: r`Sinus har nulpunkter i $x=p\cdot\pi$, og cosinus har nulpunkter i $x=\frac{\pi}{2}+p\cdot\pi$, hvor $p$ er et helt tal.`,
          kw: 'periode sinusfunktion cosinusfunktion symmetri',
        },
        {
          id: 'tangens',
          name: 'Tangens og grundrelationen',
          tex: r`\tan(x)=\frac{\sin(x)}{\cos(x)}\qquad\cos^2(x)+\sin^2(x)=1`,
          note: r`Tangens har perioden $\pi$ og er ikke defineret for $x=\frac{\pi}{2}+p\cdot\pi$.`,
        },
      ],
    },
    {
      title: 'Harmoniske svingninger',
      items: [
        {
          id: 'svingning',
          name: 'Harmonisk svingning',
          tex: r`f(x)=A\cdot\sin(b\cdot x+c)+d`,
          rows: [
            ['Amplitude', r`|A|`],
            ['Periode', r`T=\frac{2\pi}{b}`],
            ['Ligevægtslinje', r`y=d`],
            ['Største- og mindsteværdi', r`d+|A|\quad\text{og}\quad d-|A|`],
            ['Faseforskydning', r`-\frac{c}{b}`],
          ],
          note: r`For $b>0$. Faseforskydningen er, hvor langt grafen er flyttet mod højre i forhold til $A\sin(bx)+d$.`,
          ex: r`$f(x)=3\sin(2x)+5$: amplitude $3$, periode $\frac{2\pi}{2}=\pi$, ligevægtslinje $y=5$, maksimum $8$ og minimum $2$.`,
          kw: 'amplitude periode ligevægt svingningstid sinussvingning',
        },
        {
          id: 'aflaes',
          name: 'Bestem konstanterne ud fra grafen',
          tex: r`A=\frac{\text{maks}-\text{min}}{2}\qquad d=\frac{\text{maks}+\text{min}}{2}\qquad b=\frac{2\pi}{T}`,
          note: r`$T$ aflæses som afstanden mellem to nabotoppe. Frekvensen er $\frac{1}{T}$.`,
          kw: 'aflæse amplitude frekvens',
        },
      ],
    },
    {
      title: 'Trigonometriske ligninger',
      items: [
        {
          id: 'ligninger',
          name: 'Grundligningerne',
          wide: true,
          rows: [
            ['Sinus', r`\sin(x)=k\;\Leftrightarrow\;x=\sin^{-1}(k)+p\cdot 2\pi\;\lor\;x=\pi-\sin^{-1}(k)+p\cdot 2\pi`],
            ['Cosinus', r`\cos(x)=k\;\Leftrightarrow\;x=\cos^{-1}(k)+p\cdot 2\pi\;\lor\;x=-\cos^{-1}(k)+p\cdot 2\pi`],
            ['Tangens', r`\tan(x)=k\;\Leftrightarrow\;x=\tan^{-1}(k)+p\cdot\pi`],
          ],
          note: r`$p$ er et vilkårligt helt tal. For sinus og cosinus kræves $-1\leq k\leq 1$. Udvælg til sidst de løsninger, der ligger i det ønskede interval.`,
          ex: r`$\sin(x)=0{,}5$ i $[0;2\pi]$: $\;x=\frac{\pi}{6}\,\lor\,x=\pi-\frac{\pi}{6}=\frac{5\pi}{6}$`,
          kw: 'trigonometrisk ligning løsninger periode',
        },
      ],
    },
    {
      title: 'Differentiation og integration',
      items: [
        {
          id: 'afledede',
          name: 'Afledede funktioner',
          rows: [
            ['Sinus', r`\big(\sin(x)\big)'=\cos(x)`],
            ['Cosinus', r`\big(\cos(x)\big)'=-\sin(x)`],
            ['Tangens', r`\big(\tan(x)\big)'=1+\tan^2(x)=\frac{1}{\cos^2(x)}`],
            ['Harmonisk svingning', r`\big(A\sin(bx+c)+d\big)'=A\cdot b\cdot\cos(bx+c)`],
          ],
          kw: 'differentiere sinus cosinus',
        },
        {
          id: 'stamfunktioner',
          name: 'Stamfunktioner',
          rows: [
            ['Sinus', r`\int\sin(x)\,dx=-\cos(x)+k`],
            ['Cosinus', r`\int\cos(x)\,dx=\sin(x)+k`],
            ['Med lineær indre funktion', r`\int\sin(bx+c)\,dx=-\frac{1}{b}\cdot\cos(bx+c)+k`],
          ],
          kw: 'integrere sinus cosinus',
        },
      ],
    },
  ],
};
