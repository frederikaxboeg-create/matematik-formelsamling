// Søgning på tværs af alle formler.
import { topics } from './emner/index.js';
import { plain } from './tex.js';

/** Små bogstaver, æ/ø/å → ae/oe/aa, og kun bogstaver og tal. */
export const norm = (s) => String(s ?? '')
  .toLowerCase()
  .replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

function bodyText(item) {
  const parts = [item.note, item.ex];
  for (const row of item.rows ?? []) parts.push(row[0]);
  if (item.table) {
    parts.push(...item.table.head);
    for (const row of item.table.rows) parts.push(...row);
  }
  for (const m of [].concat(item.maple ?? [])) parts.push(m);
  return parts.filter(Boolean).map(plain).join(' ');
}

let index = null;

function build() {
  index = [];
  for (const topic of topics) {
    for (const section of topic.sections) {
      for (const item of section.items) {
        index.push({
          topic, section, item,
          name: norm(item.name),
          kw: norm(item.kw),
          ctx: norm(`${topic.title} ${section.title}`),
          body: norm(bodyText(item)),
        });
      }
    }
  }
}

/** Formler, der matcher alle ord i søgningen – bedste match først. */
export function search(query, limit = 60) {
  if (!index) build();
  const q = norm(query);
  const tokens = q.split(' ').filter(Boolean);
  if (!tokens.length) return [];
  const hits = [];
  index.forEach((e, order) => {
    let score = 0;
    for (const t of tokens) {
      let s = 0;
      if (e.name.startsWith(t) || e.name.includes(` ${t}`)) s = 12;
      else if (e.name.includes(t)) s = 8;
      else if (e.kw.includes(t)) s = 6;
      else if (e.ctx.includes(t)) s = 3;
      else if (e.body.includes(t)) s = 1;
      if (!s) return;
      score += s;
    }
    if (e.name === q) score += 20;
    else if (e.name.startsWith(q)) score += 8;
    if (e.item.extra) score -= 1;
    hits.push({ ...e, score, order });
  });
  hits.sort((a, b) => b.score - a.score || a.order - b.order);
  return hits.slice(0, limit);
}

/** Emner, hvis titel matcher søgningen. */
export function searchTopics(query) {
  const tokens = norm(query).split(' ').filter(Boolean);
  if (!tokens.length) return [];
  return topics.filter((t) => {
    const title = norm(`${t.title} ${t.desc}`);
    return tokens.every((tok) => title.includes(tok));
  });
}
