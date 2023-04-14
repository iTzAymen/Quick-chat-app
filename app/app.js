const socket = io("ws://quick-chat-server.onrender.com");
const history = document.getElementById("history");
const usernameEl = document.querySelector("#username");

function createChatbox(username, message, time, isClient) {
  //Create a chatbox element for the chat

  let el = `
<div class="flex gap-2">
  <h1 class="msg-username font-semibold text-brilliantazure ">${username}</h1>
  <p class="msg-time font-extralight flex items-end">${time}</p>
</div>
<p class="msg-text">${message}</p>
  `;

  if (isClient) {
    el = `
<div class="flex gap-2 flex-row-reverse">
  <h1 class="msg-username font-semibold text-brilliantazure ">You</h1>
  <p class="msg-time font-extralight flex items-end">${time}</p>
</div>
<p class="msg-text ">${message}</p>
  `;
  }

  const li = document.createElement("li");
  li.className = `msg-li border border-richblack3 ${
    isClient ? "self-end text-right" : ""
  }`;
  li.innerHTML = el;
  return li;
}

socket.on("message", (data, senderId) => {
  //When a new message is received, create chatbox

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

  const li = createChatbox(
    data.username,
    data.message,
    time,
    senderId == socket.id
  );

  history.appendChild(li);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  //When user submits a message

  e.preventDefault();
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
});

//load saved username
usernameEl.value = localStorage.getItem("username");

usernameEl.addEventListener("focusout", (e) => {
  //When user changes username

  localStorage.setItem("username", usernameEl.value);
});
