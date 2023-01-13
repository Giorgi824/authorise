export default function insertBlankAfterEveryThreeCharacters(str) {
  const stred = str.split(" ").join("").split("");
  const formatted = [];
  while (stred.length) {
    for (let i = 0; i < 3 && stred.length; i++) {
      formatted.push(stred.shift());
    }
    if (stred.length) formatted.push(" ");
  }
  return formatted.join("");
}
