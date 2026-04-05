const bill = document.getElementById("bill");
const tip = document.getElementById("tip");
const tipVal = document.getElementById("tip-val");
const people = document.getElementById("people");
const total = document.getElementById("total");

function update() {
  const b = parseFloat(bill.value) || 0;
  const t = parseFloat(tip.value) / 100;
  const p = parseInt(people.value) || 1;
  tipVal.textContent = tip.value;

  const perPerson = ((b + b * t) / p).toFixed(2);
  total.textContent = `Total per person: $${perPerson}`;
}

[bill, tip, people].forEach(el => el.addEventListener("input", update));
update();