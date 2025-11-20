import { loadWashForm } from './wash.js';
import { loadProgressSection } from './progress.js';
import { loadHistorySection } from './history.js';

const section = document.getElementById("section-content");
const welcomeText = document.getElementById("welcomeText");


async function loadUser() {
  try {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) throw new Error("Not logged in");
    const user = await res.json();
    welcomeText.textContent = `Welcome, ${user.name}`;
  } catch {
    welcomeText.textContent = "Welcome, Guest";
  }
}

function switchTab(index) {
  document.querySelectorAll(".tab-btn").forEach((btn, i) => {
    btn.classList.toggle("bg-blue-600", i === index);
    btn.classList.toggle("text-white", i === index);
    btn.classList.toggle("bg-gray-200", i !== index);
    btn.classList.toggle("text-gray-800", i !== index);
  });
  section.classList.add("fade-in");
}


const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    switchTab(index);
    section.innerHTML = "";
    if (index === 0) loadWashForm(section);
    if (index === 1) loadProgressSection(section);
    if (index === 2) loadHistorySection(section);
  });
});

loadUser();
loadWashForm(section);
