/* eslint-disable no-console */
/** Exercise 01 - Coins * */

const calculateChange = (input) => {
  let ret = `$${input} => `;
  const dollars = Math.floor(input);
  if (dollars > 10) {
    ret += 'Error: the number is too large';
  } else {
    const cents = Math.round((input - dollars) * 100);
    const quarters = Math.floor(cents / 25);
    const dimes = Math.floor((cents - quarters * 25) / 10);
    const nickels = Math.floor((cents - quarters * 25 - dimes * 10) / 5);
    const pennies = Math.floor(cents - quarters * 25 - dimes * 10 - nickels * 5);
    const changeParts = [];
    let curDesc = '';
    if (dollars > 0) {
      curDesc = 'dollar';
      if (dollars > 1) curDesc += 's';
      changeParts.push(`${dollars} ${curDesc}`);
    }
    if (quarters > 0) {
      curDesc = 'quarter';
      if (quarters > 1) curDesc += 's';
      changeParts.push(`${quarters} ${curDesc}`);
    }
    if (dimes > 0) {
      curDesc = 'dime';
      if (dimes > 1) curDesc += 's';
      changeParts.push(`${dimes} ${curDesc}`);
    }
    if (nickels > 0) {
      curDesc = 'nickel';
      if (nickels > 1) curDesc += 's';
      changeParts.push(`${nickels} ${curDesc}`);
    }
    if (pennies > 0) {
      curDesc = 'penny';
      if (pennies > 1) curDesc = 'pennies';
      changeParts.push(`${pennies} ${curDesc}`);
    }
    if (changeParts.length === 0) {
      ret += 'Error: no change, no money given';
    } else {
      ret += changeParts.join(', ');
    }
  }
  return ret;
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
console.log(calculateChange(0.0));
// $15.11 ==> Error: no change, no money given
