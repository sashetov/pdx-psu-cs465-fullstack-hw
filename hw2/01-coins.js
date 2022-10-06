/* eslint-disable no-console */
/** Exercise 01 - Coins * */

const calculateChange = (input) => {
  const dollars = Math.floor(input);
  const cents = Math.round((input - dollars) * 100);
  const quarters = Math.floor(cents / 25);
  const dimes = Math.floor((cents - quarters * 25) / 10);
  const pennies = Math.floor(cents - quarters * 25 - dimes * 10);
  return `$${input} => ${dollars} dollars, ${cents} cents, ${quarters} quarters, ${dimes} dimes, ${pennies} pennies`;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
