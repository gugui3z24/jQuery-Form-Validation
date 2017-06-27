'use strict';

// Perform functions when form is submitted
$('#regForm').on('submit', function(e) {
  // Check if the form was previously submitted
  if ($(this).hasClass('form-submitted')) {
    e.preventDefault(); // Prevent form from being submitted again
  } else {
    $(this).addClass('form-submitted'); // Add a class to identify form as being submitted already
    $('#username').attr('readonly', true); // Lock username field
    $('#email').attr('readonly', true); // Lock email field
    $('#submitButton').attr('disabled', true); // Lock submit button
  }
});

// Custom object to track if inputs are valid or not
var formValid = {
  username: false, // Username field
  email: false // Email field
};

// Function to check if fields have passed validation
function checkValidation() {
  // Check if username and email inputs are valid
  if (formValid.username && formValid.email) {
    $('#submitButton').removeAttr('disabled'); // Allow submitting of form
  } else {
    $('#submitButton').attr('disabled', true); // Block form from being submitted
  }
}

// Validation for Username input field
$('#username').on('input', function() {
  var username = $(this).val(); // Assign the input value to a variable to perform validation

  // Function to set a custom message
  function msg(body) {
    $('#username-error').text(body).show(); // Set message inside paragraph element and show it in DOM
  };

  // Function to hide paragraph tag
  function hide() {
    $('#username-error').hide(); // Hide username validation messages
  };

  // Check if username has at least one charactar
  if (username.length < 1) {
    msg('This field is required.'); // Assign an error message
    formValid.username = false; // Set valid status to false
    checkValidation(); // Perform validation check
  } else {
    hide(); // Hide previous error message
    formValid.username = true; // Set username as valid up to this point
    checkValidation(); // Perform validation check
    var testExp = new RegExp(/^[a-zA-Z0-9]+$/); // Create regular expression to check against username input
    // Check if username is alphanumeric
    if (!testExp.test(username)) {
      msg('Must not have any special characters'); // Return custom error message
      formValid.username = false; // Set field to invalid
      checkValidation(); // Perform validation check
    } else {
      hide(); // Hide previous error message
      formValid.username = true; // Set username field as valid
      checkValidation(); // Perform validation check
      // Check if username meets length requirements
      if (username.length < 3 || username.length > 10) {
        msg('Must be at least 3 characters but no more than 10'); // Return error message
        formValid.username = false; // Set input field as invalid
        checkValidation(); // Perform validation check
      } else {
        hide(); // Hide previous error message
        formValid.username = true; // Set input as valid
        checkValidation(); // Perform validation check
      }
    }
  }
});

// Validation for E-mail Input
$('#email').on('input', function() {
  var email = $(this).val(); // Assign input value to a variable

  // Function to assign message to paragraph tag
  function msg(body) {
    $('#email-error').text(body).show(); // Show any error messages
  };

  // Function to hide error message
  function hide() {
    $('#email-error').hide(); // Hide any error message
  };

  // Check if e-mail value is at least 1 character
  if (email.length < 1) {
    msg('This field is required.'); // Assign error message to DOM.
    formValid.email = false; // Set input as invalid
    checkValidation(); // Perform validation check
  } else {
    hide(); // Hide previous error message
    formValid.email = true; // Set input as valid
    checkValidation(); // Perform validation check
    var testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/); // Regular Expression to test against e-mail value
    // Check if e-mail value passes regular expression test
    if (!testExp.test(email)) {
      msg('Must be a valid e-mail'); // Return custom error message
      formValid.email = false; // Set input as invalid
      checkValidation(); // Perform validation check
    } else {
      hide(); // Hide previous error messages
      formValid.email = true; // Set input as invalid
      checkValidation(); // Perform validation check
      // Check if e-mail value meets length requirements
      if (email.length < 3 || email.length > 30) {
        msg('Must be at least 3 characters but no more than 30'); // Return custom error message to DOM
        formValid.email = false; // Set input as invalid
        checkValidation(); // Perform validation check
      } else {
        hide(); // Hide previous error message
        formValid.email = true; // Set input as valid
        checkValidation(); // Perform validation check
      }
    }
  }
});
