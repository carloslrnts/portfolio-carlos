// Load sections dynamically
const sections = ["about", "projects", "contact"];
const main = document.getElementById("main-content");

sections.forEach(section => {
  fetch(`sections/${section}.html`)
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      main.appendChild(div);

      if (section === "projects") initProjectTabs();
    });
});

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fade-in');
  });
});
setTimeout(() => {
  document.querySelectorAll("section").forEach(sec => observer.observe(sec));
}, 1500);

// Tab switching for Projects & Tech Stack
function initProjectTabs() {
  const tabProjects = document.getElementById("tabProjects");
  const tabTech = document.getElementById("tabTech");
  const contentProjects = document.getElementById("contentProjects");
  const contentTech = document.getElementById("contentTech");

  const tabs = [
    { btn: tabProjects, content: contentProjects },
    { btn: tabTech, content: contentTech },
  ];

  const activateTab = (activeTab) => {
    tabs.forEach(({ btn, content }) => {
      const isActive = btn === activeTab.btn;
      btn.classList.toggle("tab-btn-active", isActive);
      btn.classList.toggle("tab-btn", !isActive);
      content.classList.toggle("hidden", !isActive);
    });
  };

  // Listener
  tabProjects.addEventListener("click", () => activateTab(tabs[0]));
  tabTech.addEventListener("click", () => activateTab(tabs[1]));

  // Default: Projects aktif
  activateTab(tabs[0]);
}
