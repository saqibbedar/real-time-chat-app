function gotoChat() {
  localStorage.setItem("welcome_page", "hide");
  document.getElementById("welcome").style.display = "none";
}

function openMenu() {
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("menu-icon").innerHTML = `
        <svg id="close-menu-icon" stroke="currentColor" onclick="closeMenu()"  class="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" fill="none" stroke-width="0" viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
        `;
}

function closeMenu() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById(
    "menu-icon"
  ).innerHTML = `<svg stroke="currentColor" onclick="openMenu()" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>`;
}

function closeChat() {
  localStorage.removeItem("welcome_page");
  document.getElementById("welcome").style.display = "grid";
  closeMenu(); // close the menu
}

function clearLocalStorage() {
  if (localStorage.getItem("welcome_page") == "hide") {
    document.getElementById("welcome").style.display = "none";
  } else {
    document.getElementById("welcome").style.display = "grid";
  }
}

clearLocalStorage();

const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const listitem = document.createElement("li");
  listitem.classList.add("shadow-md");
  listitem.textContent = msg;
  messages.appendChild(listitem);
  let chatbody = document.getElementById("chats");
  chatbody.scrollTop = chatbody.scrollHeight;
});
