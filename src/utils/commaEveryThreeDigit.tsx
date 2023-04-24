const commaEveryThreeDigit = (n: number) => {
  const [integerPart, decimalPart] = n.toString().split('.');
  const integerPartWithComma = parseInt(integerPart, 10).toLocaleString();
  const decimalPartWithFixedLength = decimalPart
    ? decimalPart.padEnd(5, '0').slice(0, 5)
    : '';
  const decimalPartWithDot = decimalPartWithFixedLength
    ? `.${decimalPartWithFixedLength}`
    : '';
  return `$${integerPartWithComma}${decimalPartWithDot}`;
};

export default commaEveryThreeDigit;
