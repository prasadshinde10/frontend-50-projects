const messages = document.getElementById("messages");
const msg = document.getElementById("msg");
const send = document.getElementById("send");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `bubble ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
send.onclick = () => {
  if (!msg.value.trim()) return;
  addMessage(msg.value.trim(), "user");
  const reply = "Thanks! I'll get back to you.";
  msg.value = "";
  setTimeout(() => addMessage(reply, "bot"), 600);
};