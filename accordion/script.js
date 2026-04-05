const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.querySelector(".title").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});