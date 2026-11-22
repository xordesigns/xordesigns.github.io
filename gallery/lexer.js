const tokenType = {
  // Single-char tokens
  LPAR: "LPAR",
  RPAR: "RPAR",
  COLON: "COLON",
  NOT: "NOT",
  QUOT: "QUOT",

  // Multi-char tokens
  WSPACE: "WSPACE",
  STRING: "STRING",
  NUMBER: "NUMBER",
  KEYWORD: "KEYWORD",
};

let source = "";
let current = 0;
let start = 0;

function token(type, value) {
  return {
    type,
    value,
    length: value.length,
  };
}

function scan(text) {
  source = text;
  current = 0;
  start = 0;

  let tokens = [];

  while (current < text.length) {
    start = current;
    tokens.push(scanToken(tokens));
  }

  console.log(tokens);
}

function scanToken(tokens) {
  let char = advance();
  switch (char) {
    case "(":
      return token(tokenType.LPAR, char);
    case ")":
      return token(tokenType.RPAR, char);
    case ":":
      return token(tokenType.COLON, char);
    case "!":
    case "-":
      return token(tokenType.NOT, char);
    case '"':
    case "\'":
      return token(tokenType.QUOT, char);
  }
}

function advance() {
  return source[current++];
}

scan("()\"\'!-");
