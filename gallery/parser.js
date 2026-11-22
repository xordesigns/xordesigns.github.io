/*
phrase := (expr (WSPACE)+)*
expr := (not_expr | paren_expr | keyword_expr)
not_expr := not (paren_expr | keyword_expr)
not := '-' | '!'
keyword_expr := (keyword COLON (naked_value | quote_value)) | is_expr
keyword := 't' | 's' | 'e' | 'fe' | 'ie' | 'slot' | 'id' | 'a' | 'ft' | 'set'
is_expr := IS COLON ('basic' | 'advanced' | 'etr' | 'split' | 'global' | 'complex')
naked_value := (LITERAL)*
quote_value := QUOT (.)* QUOT
paren_expr := LPAR expr (binop expr)+ RPAR
binop := 'and' | 'or'
*/

function phrase() {}

function expr() {}

function not_expr() {}

function not() {}

function keyword_expr() {}

function keyword() {}

function is_expr() {}

function naked_value() {}

function quote_value() {}

function paren_expr() {}

function binop() {}


function parseSearch(searchString) {
  const filters = [];

  return filters;
}

const not = (predicate) => (card) => !predicate(card);
const and = (a, b) => (card) => a(card) && b(card);
const or = (a, b) => (card) => a(card) || b(card);

const nameFilter = (name) => (card) =>
  card.cleanNames.some((cleanName) => cleanName.includes(name.toLowerCase()));

const typeFilter = (type) => (card) =>
  card.type.toLowerCase().includes(type.toLowerCase());

const subtypeFilter = (subtype) => (card) =>
  card.subtype.toLowerCase().includes(subtype.toLowerCase());

const effectFilter = (text) => (card) =>
  Object.values(card.effects).some((effect) =>
    effect.text.toLowerCase().includes(text.toLowerCase()),
  );

const functionEffectFilter = (text) => (card) =>
  card.effects.function &&
  card.effects.function.text.toLowerCase().includes(text.toLowerCase());

const interruptEffectFilter = (text) => (card) =>
  card.effects.interrupt &&
  card.effects.interrupt.text.toLowerCase().includes(text.toLowerCase());

const slotFilter = (slot) => (card) =>
  slot.length === 1 &&
  Object.values(card.effects).some((effect) => effect.slots?.includes(+slot));

const isBasicFilter = (card) => !card.subtype;
const isAdvancedFilter = (card) => !!card.subtype;
const isSplitFilter = (card) => card.effects.primary || card.effects.secondary;
const isGlobalFilter = (card) =>
  Object.values(card.effects).some((effect) => effect.slots?.length === 3);
const isComplexFilter = (card) => card.rulings && card.rulings.length;