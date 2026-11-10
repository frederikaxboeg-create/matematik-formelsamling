// Kombinatorik og sandsynlighedsregning.
const r = String.raw;

export default {
  id: 'sandsynlighed',
  title: 'Kombinatorik og sandsynlighed',
  formula: r`K(n,r)=\frac{n!}{r!\cdot(n-r)!}`,
  desc: 'Sandsynlighedsfelter, hændelser, regneregler, fakultet, permutationer, kombinationer og stokastiske variable.',
  practice: 'sandsynlighed',
  sections: [
    {
      title: 'Sandsynlighed',
      items: [
        {
          id: 'felt',
          name: 'Sandsynlighedsfelt',
          tex: r`0\leq P(u)\leq 1\qquad P(u_1)+P(u_2)+\dots+P(u_n)=1`,
          note: r`Et sandsynlighedsfelt består af et udfaldsrum $U$ og en sandsynlighed for hvert udfald. En <b>hændelse</b> $A$ er en delmængde af udfaldsrummet, og $P(A)$ er summen af sandsynlighederne for udfaldene i $A$.`,
          kw: 'udfaldsrum udfald hændelse',
        },
        {
          id: 'symmetrisk',
          name: 'Symmetrisk sandsynlighedsfelt',
          tex: r`P(A)=\frac{\text{antal gunstige udfald}}{\text{antal mulige udfald}}`,
          note: 'Gælder, når alle udfald er lige sandsynlige.',
          ex: r`Sandsynligheden for at slå mindst 5 med en terning: $\;P=\frac{2}{6}=\frac{1}{3}$`,
          kw: 'gunstige mulige lige sandsynlige',
        },
        {
          id: 'komplementaer',
          name: 'Komplementær hændelse',
          tex: r`P(\overline{A})=1-P(A)`,
          note: r`$\overline{A}$ er hændelsen, at $A$ <b>ikke</b> sker. Bruges ofte til «mindst én»: $P(\text{mindst én})=1-P(\text{ingen})$.`,
          ex: r`Mindst én sekser i fire slag: $\;1-\left(\frac{5}{6}\right)^4\approx 0{,}518$`,
          kw: 'modsat hændelse mindst én ikke',
        },
        {
          id: 'addition',
          name: 'Enten–eller (foreningsmængde)',
          tex: r`P(A\cup B)=P(A)+P(B)-P(A\cap B)`,
          note: r`Kan $A$ og $B$ ikke ske samtidig (disjunkte hændelser), er $P(A\cup B)=P(A)+P(B)$.`,
          kw: 'additionsreglen disjunkte foreningsmængde',
        },
        {
          id: 'uafhaengige',
          name: 'Både–og for uafhængige hændelser',
          tex: r`P(A\cap B)=P(A)\cdot P(B)`,
          note: 'To hændelser er uafhængige, når den ene ikke påvirker sandsynligheden for den anden.',
          ex: r`To seksere i træk: $\;\frac{1}{6}\cdot\frac{1}{6}=\frac{1}{36}$`,
          kw: 'multiplikationsreglen uafhængige fællesmængde',
        },
        {
          id: 'betinget',
          name: 'Betinget sandsynlighed',
          extra: true,
          tex: r`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`,
          note: r`Sandsynligheden for $A$, når man ved, at $B$ er sket.`,
        },
      ],
    },
    {
      title: 'Kombinatorik',
      items: [
        {
          id: 'principper',
          name: 'Multiplikations- og additionsprincippet',
          rows: [
            ['Både–og: antallet af muligheder ganges', r`n_1\cdot n_2`],
            ['Enten–eller: antallet af muligheder lægges sammen', r`n_1+n_2`],
          ],
          ex: r`3 bukser og 4 trøjer giver $3\cdot 4=12$ sæt tøj.`,
          kw: 'tælletræ valg',
        },
        {
          id: 'fakultet',
          name: 'Fakultet',
          tex: r`n!=n\cdot(n-1)\cdot(n-2)\cdots 2\cdot 1\qquad 0!=1`,
          note: r`$n!$ er antallet af måder, $n$ forskellige elementer kan stilles i rækkefølge på.`,
          ex: r`$5!=5\cdot 4\cdot 3\cdot 2\cdot 1=120$`,
          calc: 'kombinatorik',
          maple: '5!',
          kw: 'fakultet rækkefølge',
        },
        {
          id: 'permutationer',
          name: 'Permutationer',
          tex: r`P(n,r)=\frac{n!}{(n-r)!}=n\cdot(n-1)\cdots(n-r+1)`,
          note: r`Antallet af måder at udtage $r$ elementer blandt $n$ på, når <b>rækkefølgen har betydning</b>.`,
          ex: r`Guld, sølv og bronze blandt 8 løbere: $\;P(8,3)=8\cdot 7\cdot 6=336$`,
          calc: 'kombinatorik',
          kw: 'ordnet udtagelse rækkefølge permutation',
        },
        {
          id: 'kombinationer',
          name: 'Kombinationer',
          tex: r`K(n,r)=\frac{n!}{r!\cdot(n-r)!}`,
          note: r`Antallet af måder at udtage $r$ elementer blandt $n$ på, når <b>rækkefølgen er ligegyldig</b>. Skrives også $\binom{n}{r}$ og kaldes binomialkoefficienten.`,
          ex: r`Vælg 2 elever blandt 5: $\;K(5,2)=\frac{5!}{2!\cdot 3!}=\frac{120}{2\cdot 6}=10$`,
          calc: 'kombinatorik',
          maple: 'binomial(5, 2)',
          kw: 'uordnet udtagelse binomialkoefficient n over r kombination',
        },
        {
          id: 'kombinationer-regler',
          name: 'Regler for K(n, r)',
          rows: [
            ['Symmetri', r`K(n,r)=K(n,n-r)`],
            ['Randværdier', r`K(n,0)=K(n,n)=1\qquad K(n,1)=n`],
            ['Pascals trekant', r`K(n,r)=K(n-1,r-1)+K(n-1,r)`],
          ],
          kw: 'pascals trekant',
        },
      ],
    },
    {
      title: 'Stokastisk variabel',
      items: [
        {
          id: 'stokastisk',
          name: 'Stokastisk variabel og sandsynlighedsfordeling',
          tex: r`P(X=x_1)+P(X=x_2)+\dots+P(X=x_n)=1`,
          note: r`En stokastisk variabel $X$ knytter et tal til hvert udfald af et eksperiment. Sandsynlighedsfordelingen angiver $P(X=x_i)$ for hver mulig værdi $x_i$.`,
          kw: 'sandsynlighedsfordeling tilfældig variabel',
        },
        {
          id: 'middelvaerdi',
          name: 'Middelværdi',
          tex: r`\mu=E(X)=\sum_{i=1}^{n}x_i\cdot P(X=x_i)`,
          note: 'Den værdi, man i gennemsnit får, hvis eksperimentet gentages mange gange.',
          ex: r`Ét slag med en terning: $\;\mu=(1+2+3+4+5+6)\cdot\frac{1}{6}=3{,}5$`,
          kw: 'forventet værdi forventningsværdi',
        },
        {
          id: 'spredning',
          name: 'Varians og spredning',
          tex: r`\operatorname{Var}(X)=\sum_{i=1}^{n}(x_i-\mu)^2\cdot P(X=x_i)\qquad\sigma=\sqrt{\operatorname{Var}(X)}`,
          ex: r`Ét slag med en terning: $\;\operatorname{Var}(X)=\frac{35}{12}\approx 2{,}92$ og $\sigma\approx 1{,}71$`,
          kw: 'standardafvigelse varians',
        },
      ],
    },
  ],
};
