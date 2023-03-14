// Retrieve data from local storage
let registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];

// Fill the input fields with saved data
document.getElementById('name').value = registrationData.name || '';
document.getElementById('email').value = registrationData.email || '';
document.getElementById('password').value = registrationData.password || '';
document.getElementById('dob').value = registrationData.dob || '';
document.getElementById('acceptedTerms').checked = registrationData.acceptedTerms || false;

// Save data to local storage on form submit
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let dob = document.getElementById('dob').value;
  let acceptedTerms = document.getElementById('acceptedTerms').checked;
  let registration = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptedTerms: acceptedTerms
  };
  registrationData.push(registration);
  localStorage.setItem('registrationData', JSON.stringify(registrationData));
  document.getElementById('registrationForm').reset();
  renderRegistrationTable(registrationData);
});

// Add additional validation for dob input field
let dobInput = document.getElementById('dob');
dobInput.addEventListener('input', function() {
  let dobValue = new Date(dobInput.value);
  let today = new Date();
  let age = today.getFullYear() - dobValue.getFullYear();
  dobValue.setFullYear(today.getFullYear());
  if (today < dobValue) {
    age--;
  }
  if (age < 18 || age > 55) {
    dobInput.setCustomValidity("Date of birth must be between 18 and 55 years ago.");
  } else {
    dobInput.setCustomValidity("");
  }
});
