const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const fileInput = document.querySelector(".file-input");
const sendBtn = document.querySelector(".chat-form button[type='submit']");
const emojiBtn = document.querySelector(".emoji-btn");
const attachBtn = document.querySelector(".chat-controls .material-symbols-outlined");

const API_KEY = "AIzaSyBSmYWEu4EvE5pZgUhhJrsrbD7fhhsZZgM";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite";


const userData = { message: null };``

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: { text: userData.message },
      temperature: 0.7,
      maxOutputTokens: 256
    })
  };

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, requestOptions);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error?.message || "API error");

    const apiResponseText = data.candidates[0].content[0].text.trim();
    messageElement.innerHTML = apiResponseText;
  } catch (error) {
    messageElement.innerHTML = "Error generating response.";
    console.error(error);
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const handleOutgoingMessage = (userMessage) => {
  userData.message = userMessage.trim();
  messageInput.value = "";

  const messageContent = `<div class="message-text">${userData.message}</div>`;
  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32">
      <path fill="#06b6d4" d="M10 14c0-5 4-9 9-9h26c5 0 9 4 9 9v18c0 5-4 9-9 9H28l-8 6-2-6H19c-5 0-9-4-9-9V14z"/>
      <rect fill="#fff" x="18" y="18" width="28" height="22" rx="4" ry="4"/>
      <rect fill="#0b7285" x="30" y="12" width="4" height="6" rx="1"/>
      <circle fill="#0b7285" cx="32" cy="11" r="2"/>
      <circle fill="#0b7285" cx="26.5" cy="27" r="2.5"/>
      <circle fill="#0b7285" cx="37.5" cy="27" r="2.5"/>
      <rect fill="#0b7285" x="26" y="33" width="12" height="3" rx="1.5"/>
    </svg>
    <div class="message-text">
      <div class="thinking-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;

    const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    generateBotResponse(incomingMessageDiv);
  }, 600);
};

messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(userMessage);
  }
});

const handleOutgoingFile = (file) => {
  const messageContent = `<div class="message-text">📎 ${file.name}</div>`;
  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (userMessage) handleOutgoingMessage(userMessage);
});

attachBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) handleOutgoingFile(file);
  fileInput.value = "";
});

const emojiPicker = document.createElement("div");
emojiPicker.classList.add("emoji-picker");
emojiPicker.style.position = "absolute";
emojiPicker.style.bottom = "60px";
emojiPicker.style.left = "20px";
emojiPicker.style.background = "#fff";
emojiPicker.style.border = "1px solid #ddd";
emojiPicker.style.padding = "8px";
emojiPicker.style.display = "none";
emojiPicker.style.flexWrap = "wrap";
emojiPicker.style.maxHeight = "150px";
emojiPicker.style.overflowY = "auto";
emojiPicker.style.width = "220px";
document.body.appendChild(emojiPicker);


const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😍","😘","😗","😚","😙","😋","😜","😝","😛","🤑","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","🥱","😴","😌","😒","😓","😔","😕","🫠","🫡","🫢","😲","😳","🥺","😦","😧","😨","😰","😢","😭","😱","😖","😞","😩","😤","😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","🙁","☹️","👍","👎","👊","✊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦵","🦶","👣","❤️","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","💯","💢","💥","💫","💦","💨","🔥","⭐","🌟","✨","⚡","☀️","🌤️","🌈","🌙","☁️","⛈️","🌧️","🌪️","🌊","❄️","☃️","⛄","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐒","🦍","🦧","🐔","🐧","🐦","🦉","🦅","🦆","🦢","🦜","🦩","🦚","🦃","🐓","🦤","🐊","🐢","🐍","🦎","🐲","🐉","🦕","🦖","🐳","🐬","🐟","🐠","🐡","🦈","🐙","🐚","🦀","🦞","🦐","🦑","🐌","🦋","🐛","🐜","🐝","🐞","🪲","🪳","🪰","🪱","🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🌽","🥕","🧄","🧅","🥔","🍠","🥐","🍞","🥖","🥨","🥯","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🥙","🧆","🥚","🍳","🥘","🍲","🥣","🥗","🍿","🧈","🧂","🥫","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍢","🍡","🍧","🍨","🍦","🥧","🍰","🎂","🧁","🍮","🍭","🍬","🍫","🍩","🍪","🥛","🍼","☕","🍵","🧃","🥤","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🏓","🏸","🥊","🥋","🥅","⛳","⛸️","🎣","🤿","🎽","🎿","🛷","🥌","🎯","🥇","🥈","🥉","🏆","🏅","🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🛵","🏍️","🚲","🛴","🚨","🚔","🚍","🚠","🚡","🚟","🚃","🚋","🚞","🚝","🚄","🚅","🚂","✈️","🛫","🛬","🛩️","🚁","🛰️","🚀","🛸","⛵","🚤","🛥️","🛳️","🚢","⚓","🗺️","🗽","🗼","🏰","🏯","🏟️","🎡","🎢","🎠","⛲","🌋","🏝️","🏜️","🏕️","🏖️","⌚","📱","💻","⌨️","🖥️","🖨️","🖱️","🖲️","💽","💾","💿","📀","📷","📸","📹","🎥","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🧯","🛢️","💸","💵","💴","💶","💷","💰","💳","🪙","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","🪛","🪚","🔪","🗡️","⚔️","🛡️","🚪","🪑","🛏️","🛋️","🚽","🚿","🛁","🪠","🧴","🧹","🧺","🧻","🪣","🧼","🪥","🧽","🛎️","🔑","🗝️","🚬","⚰️","⚱️","🏺","🏳️","🏴","🏁","🚩","🏳️‍🌈","🏳️‍⚧️"];


emojis.forEach((emoji) => {
const btn = document.createElement("button");
btn.textContent = emoji;
btn.style.border = "none";
btn.style.fontSize = "20px";
btn.style.background = "transparent";
btn.style.cursor = "pointer";
btn.addEventListener("click", () => {
messageInput.value += emoji;
emojiPicker.style.display = "none";
});
emojiPicker.appendChild(btn);
});


emojiBtn.addEventListener("click", () => {
emojiPicker.style.display = emojiPicker.style.display === "none" ? "flex" : "none";
});

