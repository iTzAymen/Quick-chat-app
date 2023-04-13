const socket = io("ws://localhost:8080");
const history = document.getElementById("history");

socket.on("message", (data, senderId) => {
  now = new Date();
  then = new Date(data.date);
  const hour = then.getHours() % 12 || 12;
  const minute = then.getMinutes().toString().padStart(2, "0");
  const ampm = then.getHours() >= 12 ? "PM" : "AM";

  let time = `${hour}:${minute} ${ampm}`;
  if (now.toDateString() === then.toDateString()) {
    time = `Today at ${hour}:${minute} ${ampm}`;
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (yesterday.toDateString() === then.toDateString()) {
      time = `Yesterday at ${hour}:${minute} ${ampm}`;
    } else {
      time = `${then.toLocaleDateString()} at ${hour}:${minute} ${ampm}`;
    }
  }

  const el = `
<div class="flex gap-2">
  <h1 class="msg-username ${
    senderId == socket.id ? "text-orange-500" : "text-sky-500"
  }">${data.username}</h1>
  <p class="msg-time">${time}</p>
</div>
<p class="msg-text">${data.message}</p>
  `;

  const li = document.createElement("li");
  li.className = "msg-li";
  li.innerHTML = el;

  history.appendChild(li);
});

document.querySelector("button").onclick = () => {
  username = document.getElementById("username").value;
  message = document.getElementById("message").value;
  if (!username) {
    username = "Anonymous";
  }
  if (!message) {
    return;
  }

  const date = new Date();

  socket.emit("message", { username, message, date });
  document.getElementById("message").value = "";
};
