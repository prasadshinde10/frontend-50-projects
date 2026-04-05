const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const pass = document.getElementById("password");

  const nameErr = document.getElementById("name-error");
  const emailErr = document.getElementById("email-error");
  const passErr = document.getElementById("pass-error");

  nameErr.textContent = "";
  emailErr.textContent = "";
  passErr.textContent = "";

  if (name.value.trim() === "") {
    nameErr.textContent = "Name is required";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailErr.textContent = "Enter a valid email";
    valid = false;
  }

  if (pass.value.length < 6) {
    passErr.textContent = "Password must be at least 6 chars";
    valid = false;
  }

  if (valid) alert("Form submitted!");
});