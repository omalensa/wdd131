// ========== DATA: Tips as objects in an array ==========
const securityTips = [
  {
    id: 1,
    category: "personal",
    title: "Stay Aware of Your Surroundings",
    description: "Avoid using headphones at high volume when walking alone. Keep your phone accessible but not visible.",
    image: "images/tip-aware.jpg"
  },
  {
    id: 2,
    category: "travel",
    title: "Share Your Travel Plans",
    description: "Always inform a trusted person of your route and expected arrival time when travelling between states.",
    image: "images/tip-travel.jpg"
  },
  {
    id: 3,
    category: "home",
    title: "Secure Your Home",
    description: "Install good locks, use outdoor lighting, and never open the door to strangers after dark.",
    image: "images/tip-home.jpg"
  },
  {
    id: 4,
    category: "community",
    title: "Join or Form a Local Watch",
    description: "Community vigilance groups have proven effective. Coordinate with neighbours and local authorities.",
    image: "images/tip-community.jpg"
  },
  {
    id: 5,
    category: "personal",
    title: "Emergency Numbers on Speed Dial",
    description: "Save police, ambulance, and trusted contacts. Teach children how to use them.",
    image: "images/tip-phone.jpg"
  },
  {
    id: 6,
    category: "travel",
    title: "Avoid Night Travel When Possible",
    description: "Many incidents occur after dark on highways. Plan journeys to arrive before sunset.",
    image: "images/tip-night.jpg"
  }
];

// ========== localStorage helpers ==========
function getFavorites() {
  const stored = localStorage.getItem("safenaijaFavorites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("safenaijaFavorites", JSON.stringify(favorites));
}

function getReports() {
  const stored = localStorage.getItem("safenaijaReports");
  return stored ? JSON.parse(stored) : [];
}

function saveReports(reports) {
  localStorage.setItem("safenaijaReports", JSON.stringify(reports));
}

// ========== DOM & Display Functions ==========
function displayTips(tipsArray) {
  const container = document.querySelector("#tips-container");
  if (!container) return;

  if (tipsArray.length === 0) {
    container.innerHTML = `<p class="text-center">No tips found for this category.</p>`;
    return;
  }

  // Exclusive use of template literals + array method (map)
  container.innerHTML = tipsArray
    .map((tip) => {
      const isFavorite = getFavorites().includes(tip.id);
      return `
        <article class="card tip-card" data-id="${tip.id}">
          <button class="favorite-btn ${isFavorite ? "favorited" : ""}" 
                  aria-label="Toggle favorite" data-id="${tip.id}">
            ${isFavorite ? "♥" : "♡"}
          </button>
          <img src="${tip.image}" alt="${tip.title}" loading="lazy" width="400" height="180">
          <div class="card-body">
            <h3>${tip.title}</h3>
            <p>${tip.description}</p>
            <small>Category: ${tip.category}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function filterTips(category) {
  // Array method (filter) + conditional branching
  let filtered;
  if (category === "all") {
    filtered = securityTips;
  } else {
    filtered = securityTips.filter((tip) => tip.category === category);
  }
  displayTips(filtered);

  // Update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  const index = favorites.indexOf(id);

  // Conditional branching
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites(favorites);
  // Re-display current view
  const activeBtn = document.querySelector(".filter-btn.active");
  const currentCategory = activeBtn ? activeBtn.dataset.category : "all";
  filterTips(currentCategory);
}

// ========== Report Form Logic ==========
function handleReportSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim() || "Anonymous";
  const location = form.location.value.trim();
  const type = form.type.value;
  const description = form.description.value.trim();
  const messageEl = document.querySelector("#form-message");

  // Conditional validation
  if (!location || !type || !description) {
    messageEl.className = "form-message error";
    messageEl.textContent = "Please fill in all required fields.";
    return;
  }

  const newReport = {
    id: Date.now(),
    name,
    location,
    type,
    description,
    date: new Date().toLocaleString("en-NG")
  };

  const reports = getReports();
  reports.unshift(newReport); // newest first
  // Keep only last 10 for demo
  if (reports.length > 10) reports.pop();
  saveReports(reports);

  messageEl.className = "form-message success";
  messageEl.textContent = `Thank you, ${name}. Your report has been recorded locally. Stay safe!`;

  form.reset();
  displayRecentReports();
}

function displayRecentReports() {
  const container = document.querySelector("#recent-reports");
  if (!container) return;

  const reports = getReports();
  if (reports.length === 0) {
    container.innerHTML = `<p>No reports submitted yet on this device.</p>`;
    return;
  }

  // Template literals + array methods
  container.innerHTML = `
    <h3>Recent Reports (stored on this device)</h3>
    <ul>
      ${reports
        .slice(0, 5)
        .map(
          (r) => `
        <li>
          <strong>${r.type}</strong> in ${r.location} 
          <br><small>${r.date} – ${r.name}</small>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

// ========== Event Listeners (DOM interaction) ==========
document.addEventListener("DOMContentLoaded", () => {
  // Tips page
  if (document.querySelector("#tips-container")) {
    displayTips(securityTips);

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTips(btn.dataset.category);
      });
    });

    // Event delegation for favorite buttons
    document.querySelector("#tips-container").addEventListener("click", (e) => {
      if (e.target.classList.contains("favorite-btn")) {
        const id = Number(e.target.dataset.id);
        toggleFavorite(id);
      }
    });
  }

  // Report page
  const reportForm = document.querySelector("#report-form");
  if (reportForm) {
    reportForm.addEventListener("submit", handleReportSubmit);
    displayRecentReports();
  }
});