window.addEventListener('load', () => {
    detectDeviceAndAdjust();
    adjustContainerSize();
});
window.addEventListener('resize', adjustContainerSize);

function detectDeviceAndAdjust() {
    const container = document.querySelector('.homecontainer');
    if (!container) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
        container.classList.add('mobile');
        container.classList.remove('desktop');
    } else {
        container.classList.add('desktop');
        container.classList.remove('mobile');
    }
}

function adjustContainerSize() {
    const container = document.querySelector('.homecontainer');
    if (!container) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set container size to fit within viewport with some padding
    const padding = 20; // px
    const maxWidth = viewportWidth - padding * 2;
    const maxHeight = viewportHeight - padding * 2;

    container.style.maxWidth = maxWidth + 'px';
    container.style.maxHeight = maxHeight + 'px';

    // Optionally, set width and height to 100% to fill max size
    container.style.width = '100%';
    container.style.height = '100%';

    // Set number of columns based on screen width
    if (viewportWidth >= 100) {
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    } else {
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }

    // Adjust tile sizes dynamically based on container width and number of columns
    const tiles = container.querySelectorAll('.tile');
    if (tiles.length === 0) return;

    // Determine number of columns from CSS grid-template-columns
    const computedStyle = window.getComputedStyle(container);
    const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
    const columnCount = gridTemplateColumns.split(' ').length;

    // Calculate tile width (subtracting column gaps)
    const columnGap = parseFloat(computedStyle.getPropertyValue('column-gap'));
    const totalGapWidth = columnGap * (columnCount - 1);
    const tileWidth = (container.clientWidth - totalGapWidth) / columnCount;

    // Set tile width and height (square)
    tiles.forEach(tile => {
        tile.style.width = tileWidth + 'px';
        tile.style.height = tileWidth + 'px';
    });}

    // Optional – only needed if you want dynamic layout control

window.addEventListener('load', adjustGridColumns);
window.addEventListener('resize', adjustGridColumns);

function adjustGridColumns() {
    const container = document.querySelector('.homecontainer');
    if (!container) return;

    const width = window.innerWidth;

    if (width < 768) {
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (width < 1200) {
        container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
}
// 🔥 Chatbot Functions (NO SERVER)

function toggleChat() {
  const box = document.getElementById("chat-box");
  box.style.display = (box.style.display === "flex") ? "none" : "flex";
}

function sendChat(message) {
  const chat = document.getElementById("chat-messages");

  chat.innerHTML += `<div class="user-msg">${message}</div>`;

  // typing effect
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.innerText = "Typing...";
  chat.appendChild(typing);

  setTimeout(() => {
    typing.remove();

    let reply = getBotReply(message);

    chat.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;

  }, 800);
}

function getBotReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello 👋 Welcome to PTOM portal!";
  }

  if (msg.includes("digital notebook")) {
    return "Digital notebook is the notebook where you can write your own notes 📚";
  }

  if (msg.includes("library")) {
    return "Digital Library has books and resources 📖";
  }

  if (msg.includes("complaint")) {
    return "You can register complaints in the complaint section ⚠";
  }

  if (msg.includes("help")) {
    return "I am here to help! Ask anything about this portal 😊";
  }

  return "Sorry, I didn’t understand. Please try again.";
}

function handleChat(e) {
  if (e.key === "Enter") {
    const input = document.getElementById("chat-input");
    const msg = input.value.trim();

    if (msg !== "") {
      sendChat(msg);
      input.value = "";
    }
  }
}

