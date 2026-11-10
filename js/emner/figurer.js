// Areal og rumfang af de almindelige figurer – bruges bl.a. i optimeringsopgaver.
const r = String.raw;

export default {
  id: 'figurer',
  title: 'Areal og rumfang',
  formula: r`V=\tfrac{4}{3}\pi r^3`,
  desc: 'Areal og omkreds af plane figurer samt rumfang og overflade af kasse, cylinder, kegle og kugle.',
  sections: [
    {
      title: 'Plane figurer',
      items: [
        {
          id: 'plane',
          name: 'Areal af plane figurer',
          wide: true,
          table: {
            head: ['Figur', 'Areal', 'Omkreds'],
            rows: [
              ['Rektangel', r`$A=l\cdot b$`, r`$O=2l+2b$`],
              ['Trekant', r`$A=\tfrac{1}{2}\cdot h\cdot g$`, r`$O=a+b+c$`],
              ['Parallelogram', r`$A=h\cdot g$`, ''],
              ['Trapez', r`$A=\tfrac{1}{2}\cdot h\cdot(a+b)$`, ''],
              ['Cirkel', r`$A=\pi\cdot r^2$`, r`$O=2\cdot\pi\cdot r$`],
            ],
          },
          note: r`$h$ er højden, $g$ er grundlinjen, og i trapezet er $a$ og $b$ de to parallelle sider.`,
          kw: 'rektangel trekant parallelogram trapez cirkel areal omkreds',
        },
        {
          id: 'cirkeludsnit',
          name: 'Cirkeludsnit og cirkelbue',
          rows: [
            ['Areal af cirkeludsnit', r`A=\frac{v}{360^\circ}\cdot\pi\cdot r^2`],
            ['Længde af cirkelbue', r`b=\frac{v}{360^\circ}\cdot 2\cdot\pi\cdot r`],
          ],
          note: r`$v$ er centervinklen i grader. I radianer er $b=r\cdot v$ og $A=\tfrac{1}{2}\cdot r^2\cdot v$.`,
          kw: 'cirkeludsnit buelængde centervinkel',
        },
      ],
    },
    {
      title: 'Rumlige figurer',
      items: [
        {
          id: 'rumlige',
          name: 'Rumfang og overflade',
          wide: true,
          table: {
            head: ['Figur', 'Rumfang', 'Overflade'],
            rows: [
              ['Kasse', r`$V=l\cdot b\cdot h$`, r`$O=2\cdot(l\cdot b+l\cdot h+b\cdot h)$`],
              ['Prisme', r`$V=G\cdot h$`, ''],
              ['Cylinder', r`$V=\pi\cdot r^2\cdot h$`, r`$O=2\pi r h+2\pi r^2$`],
              ['Pyramide', r`$V=\tfrac{1}{3}\cdot G\cdot h$`, ''],
              ['Kegle', r`$V=\tfrac{1}{3}\cdot\pi\cdot r^2\cdot h$`, r`$O=\pi r s+\pi r^2$`],
              ['Kugle', r`$V=\tfrac{4}{3}\cdot\pi\cdot r^3$`, r`$O=4\cdot\pi\cdot r^2$`],
            ],
          },
          note: r`$G$ er grundfladens areal, og $h$ er højden. For cylinderen er $2\pi rh$ den krumme overflade og $2\pi r^2$ de to endeflader. For keglen er $s=\sqrt{r^2+h^2}$ sidelinjen, og $\pi rs$ er den krumme overflade.`,
          kw: 'kasse prisme cylinder pyramide kegle kugle volumen rumfang overfladeareal',
        },
      ],
    },
  ],
};
