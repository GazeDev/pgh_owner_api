module.exports = {
  preProcessAddress: preProcessAddress,
};

function preProcessAddress(address, replacePercent = true) {
  // we don't want to be careful not to convert % on search strings
  // because that can be used to assist in LIKE searching
  const specialChars = /[/+-.,!?@#$^&*<>;:|]/gi;
  const percent = /[%]/gi;
  const multipleSpaces = /\s+/g;
  address = address.replace(specialChars, ' ');
  if (replacePercent) {
    address = address.replace(percent, ' ');
  }
  // reduce any occurences of multiple spaces with just one
  address = address.replace(multipleSpaces, ' ');
  // split address apart on spaces so we can transform each part individually
  let parts = address.split(' ');
  let processedParts = [];
  for (let part of parts) {
    part = part.toUpperCase();
    part = ordsConvertPart(part);
    part = termConvertPart(part);
    processedParts.push(part);
  }

  let processedAddress = processedParts.join('');
  return processedAddress;
}

function ordsConvertPart(part) {
  const ORDS = require('./terms.js').ORDS;
  if (!ORDS.hasOwnProperty(part)) {
    return part;
  }
  return ORDS[part];
}

function termConvertPart(part) {
  const TERMS = require('./terms.js').TERMS;
  if (!TERMS.hasOwnProperty(part)) {
    return part;
  }
  return TERMS[part];
}
