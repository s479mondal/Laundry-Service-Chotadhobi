import { loadReceiveRequests } from './receive.js';
import { loadUpdateRequests } from './update.js';
import { loadAdminHistory } from './history.js';

const section = document.getElementById("section-content");

function switchTab(index) {
  document.querySelectorAll(".tab-btn").forEach((btn, i) => {
    btn.classList.toggle("bg-blue-600", i === index);
    btn.classList.toggle("text-white", i === index);
    btn.classList.toggle("bg-gray-200", i !== index);
    btn.classList.toggle("text-gray-800", i !== index);
  });
}

const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    switchTab(index);
    section.innerHTML = "";
    if (index === 0) loadReceiveRequests(section);
    if (index === 1) loadUpdateRequests(section);
    if (index === 2) loadAdminHistory(section);
  });
});

loadReceiveRequests(section); // default tab
