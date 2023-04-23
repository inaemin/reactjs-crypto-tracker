const formatNum = (n: number | undefined) => {
  const answer: string[] = [];
  String(n)
    .split('')
    .reverse()
    .forEach((el, idx) => {
      if (idx === 0) answer.push(el);
      else if (idx % 3 === 0) answer.unshift(`${el},`);
      else answer.unshift(el);
    });

  return answer.join('');
};

export default formatNum;
