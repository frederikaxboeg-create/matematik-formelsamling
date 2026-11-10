// Differentialligninger af første orden.
const r = String.raw;

export default {
  id: 'differentialligninger',
  title: 'Differentialligninger',
  formula: r`y'=k\cdot y\;\Rightarrow\;y=c\cdot e^{kx}`,
  desc: 'Løsningsformler for de fire typer i kernestoffet, logistisk vækst, separation af de variable, linjeelementer og Eulers metode.',
  practice: 'differentialligninger',
  sections: [
    {
      title: 'Grundbegreber',
      items: [
        {
          id: 'begreber',
          name: 'Differentialligning og løsning',
          note: r`En differentialligning er en ligning, hvor en ukendt funktion $y=f(x)$ indgår sammen med sin afledede $y'$. En <b>løsning</b> er en funktion, der passer i ligningen. Den <b>fuldstændige løsning</b> er alle løsninger (med en konstant $c$), og en <b>partikulær løsning</b> er den ene, hvis graf går gennem et bestemt punkt.`,
          kw: 'fuldstændig partikulær løsning løsningskurve',
        },
        {
          id: 'proeve',
          name: 'Gør prøve',
          note: r`Vis, at en funktion er løsning: beregn $y'$, indsæt $y$ og $y'$ i ligningens to sider hver for sig, og vis, at de to sider giver det samme.`,
          ex: r`Er $y=3e^{2x}$ løsning til $y'=2y$? Venstre side: $y'=6e^{2x}$. Højre side: $2\cdot 3e^{2x}=6e^{2x}$. Ja.`,
          kw: 'vis at eftervis løsning indsætte',
        },
        {
          id: 'linjeelement',
          name: 'Linjeelement og tangent',
          tex: r`(x_0,\,y_0;\,\alpha)\qquad\alpha=y'`,
          note: r`Differentialligningen giver tangenthældningen $\alpha$ direkte i ethvert punkt $(x_0,y_0)$ – uden at ligningen skal løses. Tangentens ligning er $y=\alpha\cdot(x-x_0)+y_0$.`,
          ex: r`$y'=x+2y$ i punktet $(1;3)$: $\;\alpha=1+2\cdot 3=7$, så tangenten er $y=7(x-1)+3=7x-4$.`,
          kw: 'hældningsfelt tangenthældning kvalitativ analyse',
        },
      ],
    },
    {
      title: 'Løsningsformler',
      items: [
        {
          id: 'formler',
          name: 'De vigtigste typer',
          wide: true,
          table: {
            head: ['Differentialligning', 'Fuldstændig løsning', 'Vækstmodel'],
            rows: [
              [r`$y'=k$`, r`$y=k\cdot x+c$`, 'Lineær vækst'],
              [r`$y'=f(x)$`, r`$y=\displaystyle\int f(x)\,dx=F(x)+c$`, 'Stamfunktion'],
              [r`$y'=k\cdot y$`, r`$y=c\cdot e^{k x}$`, 'Eksponentiel vækst'],
              [r`$y'=b-a\cdot y$`, r`$y=\dfrac{b}{a}+c\cdot e^{-a x}$`, 'Forskudt eksponentiel vækst'],
              [r`$y'=a\cdot y+b$`, r`$y=c\cdot e^{a x}-\dfrac{b}{a}$`, 'Forskudt eksponentiel vækst'],
              [r`$y'=a\cdot y\cdot(M-y)$`, r`$y=\dfrac{M}{1+c\cdot e^{-a M x}}$`, 'Logistisk vækst'],
              [r`$y'=y\cdot(b-a\cdot y)$`, r`$y=\dfrac{b/a}{1+c\cdot e^{-b x}}$`, 'Logistisk vækst'],
            ],
          },
          note: r`$c$ er en vilkårlig konstant. For de logistiske ligninger gælder formlen for løsninger med $0<y<M$ og $c>0$. Derudover er $y=0$ og $y=M$ konstante løsninger.`,
          maple: 'dsolve(diff(y(x), x) = k*y(x), y(x))',
          kw: 'løsningsformel typer eksponentiel logistisk',
        },
        {
          id: 'konstanten',
          name: 'Bestem konstanten c',
          wide: true,
          rows: [
            ['Eksponentiel vækst', r`y=c\cdot e^{kx}\;\text{ med }\;y(0)=y_0:\quad c=y_0`],
            ['Forskudt eksponentiel vækst', r`y=\frac{b}{a}+c\cdot e^{-ax}\;\text{ med }\;y(0)=y_0:\quad c=y_0-\frac{b}{a}`],
            ['Logistisk vækst', r`y=\frac{M}{1+c\cdot e^{-aMx}}\;\text{ med }\;y(0)=y_0:\quad c=\frac{M}{y_0}-1`],
          ],
          note: r`Generelt: indsæt punktet $(x_0,y_0)$ i den fuldstændige løsning, og løs ligningen for $c$.`,
          ex: r`$y'=6-2y$ og $y(0)=1$: $\;y=3+c\cdot e^{-2x}$ og $c=1-3=-2$, så $y=3-2e^{-2x}$.`,
          maple: 'dsolve({diff(y(x), x) = 6 - 2*y(x), y(0) = 1}, y(x))',
          kw: 'begyndelsesbetingelse begyndelsesværdi partikulær',
        },
      ],
    },
    {
      title: 'Egenskaber ved modellerne',
      items: [
        {
          id: 'eksponentiel',
          name: 'Eksponentiel vækst',
          tex: r`y'=k\cdot y`,
          note: r`Væksthastigheden er proportional med størrelsen selv. $k>0$ giver vækst med fordoblingstiden $\frac{\ln(2)}{k}$, og $k<0$ giver aftagen med halveringstiden $-\frac{\ln(2)}{k}$.`,
          ex: r`$y'=0{,}2\cdot y$ og $y(0)=50$ giver $y=50\cdot e^{0{,}2x}$.`,
          kw: 'proportional vækst',
        },
        {
          id: 'forskudt',
          name: 'Forskudt eksponentiel vækst',
          tex: r`y'=b-a\cdot y\qquad y\to\frac{b}{a}\;\text{ for }\;x\to\infty\quad(a>0)`,
          note: r`Løsningerne nærmer sig ligevægtsværdien $\frac{b}{a}$, hvor $y'=0$. Kan også skrives $y'=a\cdot\left(\frac{b}{a}-y\right)$: væksthastigheden er proportional med afstanden til ligevægten. Eksempel: Newtons afkølingslov.`,
          kw: 'ligevægt afkøling begrænset vækst',
        },
        {
          id: 'logistisk',
          name: 'Logistisk vækst',
          tex: r`y'=a\cdot y\cdot(M-y)`,
          rows: [
            ['Bæreevne (øvre grænse)', r`y\to M\;\text{ for }\;x\to\infty`],
            ['Væksten er størst, når', r`y=\frac{M}{2}`],
            ['Største væksthastighed', r`y'_{\text{maks}}=\frac{a\cdot M^2}{4}`],
            ['Tidspunktet for størst vækst', r`x=\frac{\ln(c)}{a\cdot M}`],
          ],
          note: r`Grafen er S-formet. I begyndelsen ligner væksten eksponentiel vækst, og til sidst flader den ud mod $M$.`,
          ex: r`$y'=0{,}001\cdot y\cdot(500-y)$ har løsningerne $y=\frac{500}{1+c\cdot e^{-0{,}5x}}$, fordi $a\cdot M=0{,}001\cdot 500=0{,}5$.`,
          kw: 'bæreevne s-kurve mætning',
        },
      ],
    },
    {
      title: 'Løsningsmetoder',
      items: [
        {
          id: 'separation',
          name: 'Separation af de variable',
          tex: r`y'=h(x)\cdot g(y)\quad\Rightarrow\quad\int\frac{1}{g(y)}\,dy=\int h(x)\,dx`,
          note: r`Gælder, når $g(y)\neq 0$. Saml alt med $y$ på den ene side og alt med $x$ på den anden, integrér begge sider, og isolér $y$.`,
          ex: r`$y'=x\cdot y$ (med $y>0$): $\;\int\frac{1}{y}\,dy=\int x\,dx$ giver $\ln(y)=\tfrac{1}{2}x^2+k$, så $y=c\cdot e^{\frac{1}{2}x^2}$.`,
          kw: 'separationsmetoden separable',
        },
        {
          id: 'euler',
          name: 'Eulers metode',
          tex: r`x_{n+1}=x_n+h\qquad y_{n+1}=y_n+h\cdot f(x_n,y_n)`,
          note: r`Numerisk løsning af $y'=f(x,y)$ med startpunktet $(x_0,y_0)$ og skridtlængden $h$. I hvert skridt følges tangenten et lille stykke. Jo mindre $h$, jo mere præcis.`,
          ex: r`$y'=x+y$, $y(0)=1$ og $h=0{,}1$: $\;y_1=1+0{,}1\cdot(0+1)=1{,}1$ og $y_2=1{,}1+0{,}1\cdot(0{,}1+1{,}1)=1{,}22$.`,
          kw: 'numerisk løsning skridtlængde',
        },
        {
          id: 'opstilling',
          name: 'Opstil en differentialligning',
          rows: [
            ['«Væksthastigheden er proportional med y»', r`y'=k\cdot y`],
            ['«… proportional med forskellen mellem M og y»', r`y'=k\cdot(M-y)`],
            ['«… proportional med både y og M − y»', r`y'=a\cdot y\cdot(M-y)`],
            ['«… er konstant»', r`y'=k`],
          ],
          note: r`«Væksthastighed» oversættes til $y'$, og «proportional med» til «en konstant gange».`,
          kw: 'modellering opstille model proportional',
        },
      ],
    },
  ],
};
