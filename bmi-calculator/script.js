const height = document.getElementById("height");
const weight = document.getElementById("weight");
const result = document.getElementById("result");

document.getElementById("calc").addEventListener("click", () => {
  const h = parseFloat(height.value) / 100;
  const w = parseFloat(weight.value);
  if (!h || !w) return (result.textContent = "Please enter valid values.");

  const bmi = (w / (h * h)).toFixed(1);
  let status = "Normal";

  if (bmi < 18.5) status = "Underweight";
  else if (bmi >= 25) status = "Overweight";

  result.textContent = `BMI: ${bmi} (${status})`;
});