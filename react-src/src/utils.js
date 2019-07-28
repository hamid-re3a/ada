
export function faDigit(text) {
  text = '' + text;
  text = text.replace(/0/g, '\u0660');
  text = text.replace(/1/g, '\u0661');
  text = text.replace(/2/g, '\u0662');
  text = text.replace(/3/g, '\u0663');
  text = text.replace(/4/g, '\u0664');
  text = text.replace(/5/g, '\u0665');
  text = text.replace(/6/g, '\u0666');
  text = text.replace(/7/g, '\u0667');
  text = text.replace(/8/g, '\u0668');
  text = text.replace(/9/g, '\u0669');
  return text;
}
