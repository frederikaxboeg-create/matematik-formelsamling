// Vektorer i planen.
const r = String.raw;

export default {
  id: 'vektorer',
  title: 'Vektorer i planen',
  formula: r`\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2`,
  desc: 'Koordinater, længde, regning med vektorer, skalarprodukt, vinkel, tværvektor, determinant, areal, projektion og linjer.',
  practice: 'vektorer',
  sections: [
    {
      title: 'Grundbegreber',
      items: [
        {
          id: 'koordinater',
          name: 'Vektorens koordinater',
          tex: r`\vec{a}=\vek{a_1}{a_2}`,
          note: r`$a_1$ er, hvor langt vektoren går i $x$-aksens retning, og $a_2$ er, hvor langt den går i $y$-aksens retning. Punktet $P(x,y)$ har stedvektoren $\overrightarrow{OP}=\svek{x}{y}$.`,
          kw: 'koordinatsæt stedvektor',
        },
        {
          id: 'vektor-to-punkter',
          name: 'Vektor mellem to punkter',
          tex: r`\overrightarrow{AB}=\vek{b_1-a_1}{b_2-a_2}`,
          note: r`For $A(a_1,a_2)$ og $B(b_1,b_2)$: slutpunkt minus startpunkt.`,
          ex: r`$A(1;2)$ og $B(4;6)$: $\;\overrightarrow{AB}=\svek{3}{4}$`,
          kw: 'forbindelsesvektor',
        },
        {
          id: 'laengde',
          name: 'Længden af en vektor',
          tex: r`|\vec{a}|=\sqrt{a_1^2+a_2^2}`,
          ex: r`$\vec{a}=\svek{3}{4}$: $\;|\vec{a}|=\sqrt{9+16}=5$`,
          calc: 'vektor2',
          kw: 'længde norm størrelse',
        },
        {
          id: 'enhedsvektor',
          name: 'Enhedsvektor',
          tex: r`\vec{e}=\frac{1}{|\vec{a}|}\cdot\vec{a}`,
          note: r`En vektor med længden 1 og samme retning som $\vec{a}$.`,
        },
        {
          id: 'retningsvinkel',
          name: 'Retningsvinkel',
          tex: r`\vec{a}=|\vec{a}|\cdot\vek{\cos(v)}{\sin(v)}\qquad\tan(v)=\frac{a_2}{a_1}`,
          note: r`$v$ er vinklen fra $x$-aksens positive retning til vektoren. Tjek kvadranten, når du bruger $\tan^{-1}$: ligger vektoren i 2. eller 3. kvadrant, skal der lægges $180^\circ$ til.`,
          kw: 'retning polære koordinater',
        },
      ],
    },
    {
      title: 'Regning med vektorer',
      items: [
        {
          id: 'regneregler',
          name: 'Sum, differens og gange med tal',
          rows: [
            ['Sum', r`\vec{a}+\vec{b}=\vek{a_1+b_1}{a_2+b_2}`],
            ['Differens', r`\vec{a}-\vec{b}=\vek{a_1-b_1}{a_2-b_2}`],
            ['Gange med et tal', r`t\cdot\vec{a}=\vek{t\cdot a_1}{t\cdot a_2}`],
          ],
          note: r`$|t\cdot\vec{a}|=|t|\cdot|\vec{a}|$. For $t<0$ vender vektoren modsat.`,
          kw: 'addition subtraktion skalering',
        },
        {
          id: 'indskudsreglen',
          name: 'Indskudsreglen',
          tex: r`\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}`,
          note: r`Desuden er $\overrightarrow{BA}=-\overrightarrow{AB}$.`,
        },
        {
          id: 'parallelle',
          name: 'Parallelle vektorer',
          tex: r`\vec{a}\parallel\vec{b}\;\Leftrightarrow\;\vec{a}=t\cdot\vec{b}\;\Leftrightarrow\;\det(\vec{a},\vec{b})=0`,
          note: 'Gælder for egentlige vektorer (ikke nulvektoren).',
        },
      ],
    },
    {
      title: 'Skalarprodukt og vinkler',
      items: [
        {
          id: 'skalarprodukt',
          name: 'Skalarprodukt (prikprodukt)',
          tex: r`\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2`,
          note: 'Resultatet er et tal – ikke en vektor.',
          ex: r`$\svek{3}{4}\cdot\svek{2}{-1}=3\cdot 2+4\cdot(-1)=2$`,
          calc: 'vektor2',
          kw: 'prikprodukt skalarprodukt',
        },
        {
          id: 'skalarprodukt-vinkel',
          name: 'Skalarprodukt og vinkel',
          tex: r`\vec{a}\cdot\vec{b}=|\vec{a}|\cdot|\vec{b}|\cdot\cos(v)`,
          note: r`$v$ er vinklen mellem vektorerne, $0^\circ\leq v\leq 180^\circ$.`,
        },
        {
          id: 'vinkel',
          name: 'Vinkel mellem to vektorer',
          tex: r`\cos(v)=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\cdot|\vec{b}|}`,
          ex: r`$\vec{a}=\svek{3}{4}$ og $\vec{b}=\svek{2}{-1}$: $\;\cos(v)=\frac{2}{5\cdot\sqrt{5}}$, så $v\approx 79{,}70^\circ$.`,
          calc: 'vektor2',
        },
        {
          id: 'fortolkning',
          name: 'Fortolkning af skalarproduktet',
          rows: [
            ['Spids vinkel', r`\vec{a}\cdot\vec{b}>0`],
            ['Ret vinkel (ortogonale vektorer)', r`\vec{a}\cdot\vec{b}=0`],
            ['Stump vinkel', r`\vec{a}\cdot\vec{b}<0`],
          ],
          kw: 'ortogonal vinkelret fortegn',
        },
        {
          id: 'skalar-regneregler',
          name: 'Regneregler for skalarproduktet',
          rows: [
            ['Rækkefølgen er ligegyldig', r`\vec{a}\cdot\vec{b}=\vec{b}\cdot\vec{a}`],
            ['Gange ind i parentes', r`\vec{a}\cdot(\vec{b}+\vec{c})=\vec{a}\cdot\vec{b}+\vec{a}\cdot\vec{c}`],
            ['Tal uden for', r`(t\cdot\vec{a})\cdot\vec{b}=t\cdot(\vec{a}\cdot\vec{b})`],
            ['Med sig selv', r`\vec{a}\cdot\vec{a}=|\vec{a}|^2`],
          ],
        },
      ],
    },
    {
      title: 'Tværvektor, determinant og areal',
      items: [
        {
          id: 'tvaervektor',
          name: 'Tværvektor',
          tex: r`\tv{a}=\vek{-a_2}{a_1}`,
          note: r`$\tv{a}$ er $\vec{a}$ drejet $90^\circ$ mod uret. Den har samme længde som $\vec{a}$ og står vinkelret på den.`,
          ex: r`$\vec{a}=\svek{3}{4}$ giver $\tv{a}=\svek{-4}{3}$.`,
          kw: 'hat vektor drejet 90 grader',
        },
        {
          id: 'determinant',
          name: 'Determinant',
          tex: r`\det(\vec{a},\vec{b})=\begin{vmatrix}a_1 & b_1\\a_2 & b_2\end{vmatrix}=a_1b_2-a_2b_1=\tv{a}\cdot\vec{b}`,
          note: r`$\det(\vec{a},\vec{b})>0$, når $\vec{b}$ ligger mod uret i forhold til $\vec{a}$, og $<0$, når $\vec{b}$ ligger med uret. Desuden er $\det(\vec{a},\vec{b})=|\vec{a}|\cdot|\vec{b}|\cdot\sin(v)$, hvor $v$ er vinklen fra $\vec{a}$ til $\vec{b}$.`,
          ex: r`$\det\!\left(\svek{3}{4},\svek{2}{-1}\right)=3\cdot(-1)-4\cdot 2=-11$`,
          calc: 'vektor2',
        },
        {
          id: 'areal',
          name: 'Areal af parallelogram og trekant',
          rows: [
            ['Parallelogram udspændt af to vektorer', r`A=|\det(\vec{a},\vec{b})|`],
            ['Trekant udspændt af to vektorer', r`T=\tfrac{1}{2}\cdot|\det(\vec{a},\vec{b})|`],
          ],
          ex: r`Trekanten $ABC$ med $\overrightarrow{AB}=\svek{3}{4}$ og $\overrightarrow{AC}=\svek{2}{-1}$ har arealet $\tfrac{1}{2}\cdot|-11|=5{,}5$.`,
          kw: 'areal parallelogram trekant udspændt',
        },
      ],
    },
    {
      title: 'Projektion',
      items: [
        {
          id: 'projektion',
          name: 'Projektion af en vektor på en vektor',
          tex: r`\vec{b}_{\vec{a}}=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\cdot\vec{a}`,
          note: r`$\vec{b}_{\vec{a}}$ er projektionen af $\vec{b}$ på $\vec{a}$ – den del af $\vec{b}$, der peger langs $\vec{a}$.`,
          ex: r`$\vec{a}=\svek{3}{4}$ og $\vec{b}=\svek{2}{-1}$: $\;\vec{b}_{\vec{a}}=\frac{2}{25}\cdot\svek{3}{4}=\svek{0{,}24}{0{,}32}$`,
          calc: 'vektor2',
        },
        {
          id: 'projektion-laengde',
          name: 'Længden af projektionen',
          tex: r`|\vec{b}_{\vec{a}}|=\frac{|\vec{a}\cdot\vec{b}|}{|\vec{a}|}`,
        },
      ],
    },
    {
      title: 'Linjer med vektorer',
      items: [
        {
          id: 'parameterfremstilling',
          name: 'Parameterfremstilling for en linje',
          tex: r`\vek{x}{y}=\vek{x_0}{y_0}+t\cdot\vek{r_1}{r_2}`,
          note: r`Linjen går gennem $P_0(x_0,y_0)$ og har retningsvektoren $\vec{r}=\svek{r_1}{r_2}$. Gennem to punkter $A$ og $B$ kan man bruge $\vec{r}=\overrightarrow{AB}$. Hældningen er $a=\frac{r_2}{r_1}$, når $r_1\neq 0$.`,
          kw: 'retningsvektor parameter',
        },
        {
          id: 'linje-normalvektor',
          name: 'Linjens ligning ud fra punkt og normalvektor',
          tex: r`a\cdot(x-x_0)+b\cdot(y-y_0)=0`,
          note: r`Linjen går gennem $P_0(x_0,y_0)$ og har normalvektoren $\vec{n}=\svek{a}{b}$. En retningsvektor laves om til en normalvektor med tværvektoren: $\vec{n}=\tv{r}$.`,
          ex: r`$P_0(1;2)$ og $\vec{n}=\svek{3}{4}$: $\;3(x-1)+4(y-2)=0\;\Leftrightarrow\;3x+4y-11=0$`,
          kw: 'normalvektor linjens ligning',
        },
        {
          id: 'vinkel-linjer',
          name: 'Vinkel mellem to linjer',
          tex: r`\cos(v)=\frac{|\vec{r}_1\cdot\vec{r}_2|}{|\vec{r}_1|\cdot|\vec{r}_2|}`,
          note: 'Giver den spidse vinkel. Man kan bruge enten de to retningsvektorer eller de to normalvektorer.',
        },
        {
          id: 'skaering',
          name: 'Skæring mellem to linjer',
          note: r`Indsæt parameterfremstillingens $x$ og $y$ i den anden linjes ligning, løs for $t$, og indsæt $t$ i parameterfremstillingen. For to parameterfremstillinger sættes koordinaterne lig hinanden, hvilket giver to ligninger med to ubekendte.`,
          kw: 'skæringspunkt parameterfremstilling',
        },
        {
          id: 'dist',
          name: 'Afstand fra punkt til linje',
          tex: r`\dist(P,l)=\frac{|a x_1+b y_1+c|}{\sqrt{a^2+b^2}}`,
          note: r`For $P(x_1,y_1)$ og $l:\;ax+by+c=0$.`,
          calc: 'dist-linje',
          kw: 'distanceformlen',
        },
      ],
    },
  ],
};
