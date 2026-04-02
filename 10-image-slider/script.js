let index = 1;
const img = document.getElementById("image");

document.getElementById("next").onclick = () => {
  index++;
  img.src = `https://picsum.photos/600/300?random=${index}`;
};

document.getElementById("prev").onclick = () => {
  index = Math.max(1, index - 1);
  img.src = `https://picsum.photos/600/300?random=${index}`;
};
