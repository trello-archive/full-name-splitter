const PREFIXES = ['de', 'da', 'la', 'du', 'del', 'dei', 'vda.', 'dello',
  'della', 'degli', 'delle', 'van', 'von', 'der', 'den', 'heer', 'ten', 'ter',
  'vande', 'vanden', 'vander', 'voor', 'ver', 'aan', 'mc'];

const isPrefix = (token) => PREFIXES.indexOf(token.toLowerCase()) != -1;

// M or W.
const isInitial = (token) => token.match(/^\w\.?$/);

// O'Connor, d'Artagnan match
// Noda' doesn't match
const hasApostrophe = (token) => token.match(/\w{1}'\w+/);

const adjust_exceptions = function (firstNames, lastNames) {
  // Adjusting exceptions like
  // "Ludwig Mies van der Rohe"      => ["Ludwig", "Mies van der Rohe"]
  // "Juan Martín de la Cruz Gómez"  => ["Juan Martín", "de la Cruz Gómez"]
  // "Javier Reyes de la Barrera"    => ["Javier", "Reyes de la Barrera"]
  // "Rosa María Pérez Martínez Vda. de la Cruz"
  //   => ["Rosa María", "Pérez Martínez Vda. de la Cruz"]
  if (firstNames.length > 1 &&
      lastNames.join(' ').match(/^(van der|(vda\. )?de la \w+$)/i)) {
    while (1) {
      lastNames.unshift(firstNames.pop());
      if (firstNames.length <= 2) break;
    }
  }

  return [firstNames, lastNames];
};
const tokenizeFullName = function (fullName) {

  fullName = fullName.trim().replace(/\s+/g, ' ');

  if (fullName.indexOf(',') != -1) {
    return fullName
      // ",van helsing" produces  ["", "van helsing"]
      .split(/\s*,\s*/, 2)
      // but it should be [null, "van helsing"] by lib convention
      .map(u => u || null);
  } else {
    return fullName.split(/\s+/);
  }
};

export default function (fullName) {
  let token, tokens;

  tokens = tokenizeFullName(fullName);

  let firstNames = [];
  let lastNames = [];
  while ((token = tokens.shift())) {
    if (isPrefix(token) || hasApostrophe(token) ||
        (firstNames.length && tokens.length === 0 && !isInitial(token))) {
      lastNames.push(token);
      break;
    } else {
      firstNames.push(token);
    }
  }
  lastNames = lastNames.concat(tokens);

  [firstNames, lastNames] = adjust_exceptions(firstNames, lastNames);

  return [
    firstNames.join(' ') || null,
    lastNames.join(' ') || null
  ];
}
