/** Exercise 02 - Reverse * */
/*
Exercise 02 - Reverse
- Use files 02-reverse.html and 02-reverse.js.
- For this exercise, prompt the user for an 8-digit number. Validate that your application has
  received a number that is exactly 8 digits long.
  - Write a function that reverses the digits in a number.
  - Provide the user with specific error messages.
  - Consider other test cases to check the robustness of your solution.
 */

const reverse = document.getElementById('reverse');
const number = document.getElementById('input');
const msg = document.getElementById('reverse_msg');
const err = document.getElementById('reverse_err');

function logSubmit(event) {
  // get val as string
  const num = number.value;
  // hide old
  msg.style.display = 'none';
  err.style.display = 'none';
  // set new err or msg
  if (num.length === 8) {
    const reversedNum = num.split('').reverse().join('');
    msg.textContent = `${num} --> ${reversedNum}`;
    msg.style.display = 'inherit';
  } else {
    err.textContent = 'Error: Please input an 8-digit number';
    err.style.display ='inherit';
  }
  event.preventDefault();
}

reverse.addEventListener('click', logSubmit);
