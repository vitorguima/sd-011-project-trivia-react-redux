// Como embaralhar um Array: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

const shuffleArray = (arr) => {
  for (let index = arr.length - 1; index > 0; index -= 1) {
    const replace = Math.floor(Math.random() * (index + 1));
    [arr[index], arr[replace]] = [arr[replace], arr[index]];
  }
  return arr;
};

export default shuffleArray;
