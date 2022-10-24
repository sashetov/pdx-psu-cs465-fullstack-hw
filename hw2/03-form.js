/* eslint-disable no-console */
/** Exercise 03 - Form * */
/*
- Recreate the form below using Bootstrap.
  - The form should be created using semantic and accessible markup.
- Whenever the user submits the form, output the form data in the following
  format in the console.
  - The form should be empty to start with, meaning there should be no
    default value on any item.
  - Consider what should happen with required fields.
  - Review the form submission behavior (Eloquent JavaScript - chapter 18).
  - Make sure this exercise works on different browsers.
  - Consider other test cases to check the robustness of your solution.

  ========= Form Submission =========
    Name:
    Email:
    Feedback: (feedback|No feedback was submitted)
    Newsletter: (Yes, I would like to join the newsletter|No, thank you.)
 */
const submit = document.getElementById('submit');
const name = document.getElementById('name');
const email = document.getElementById('email');
const feedback = document.getElementById('feedback');
const signup = document.getElementById('signup');

function submitForm() {
  console.log('========= Form Submission =========');
  let curText = '';
  if (name.value.length === 0) {
    curText = 'No name was provided.';
  } else {
    curText = name.value;
  }
  console.log(`Name: ${curText}`);
  if (email.value.length === 0) {
    curText = 'No email was provided.';
  } else {
    curText = email.value;
  }
  console.log(`Email: ${curText}`);
  if (feedback.value.length === 0) {
    curText = 'No feedback was submitted.';
  } else {
    curText = feedback.value;
  }
  console.log(`Feedback: ${curText}`);

  if (signup.value.length === 0) {
    curText = 'No, thank you.';
  } else {
    curText = 'Yes, I would like to join the newsletter';
  }
  console.log(`Newsletter: ${curText}`);
}

submit.addEventListener('click', submitForm);
