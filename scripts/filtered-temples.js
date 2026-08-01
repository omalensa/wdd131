// ===== Temple Data Array =====
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ===== Additional temples (at least 3 required) =====
{
  templeName: "Salt Lake Temple",
  location: "Salt Lake City, Utah, United States",
  dedicated: "1893, April, 6",
  area: 382207,
  imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
},
{
  templeName: "Boise Idaho",
  location: "Boise, Idaho, United States",
  dedicated: "1984, May, 25",
  area: 35868,
  imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/boise-idaho/2018/400x640/8-Boise-Idaho-Temple-1464849.jpg"
},
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-772761-wallpaper.jpg"
  }
];

// ===== DOM Elements =====
const templeGrid = document.querySelector("#temple-grid");
const pageTitle = document.querySelector("#page-title");
const navLinks = document.querySelectorAll("#main-nav a");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav ul");

// ===== Create a single temple card =====
function createTempleCard(temple) {
  const card = document.createElement("figure");
  card.classList.add("temple-card");

  card.innerHTML = `
    <img src="${temple.imageUrl}" 
         alt="${temple.templeName} Temple" 
         loading="lazy"
         width="400" 
         height="250">
    <div class="info">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </div>
  `;

  return card;
}

// ===== Display temples (accepts an array) =====
function displayTemples(templeList) {
  templeGrid.innerHTML = ""; // clear previous cards
  templeList.forEach((temple) => {
    templeGrid.appendChild(createTempleCard(temple));
  });
}

// ===== Filter temples =====
function filterTemples(criteria) {
  let filtered = [];

  switch (criteria) {
    case "old":
      // Dedicated before 1900
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year < 1900;
      });
      pageTitle.textContent = "Old Temples";
      break;

    case "new":
      // Dedicated after 2000
      filtered = temples.filter((t) => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year > 2000;
      });
      pageTitle.textContent = "New Temples";
      break;

    case "large":
      // Larger than 90,000 sq ft
      filtered = temples.filter((t) => t.area > 90000);
      pageTitle.textContent = "Large Temples";
      break;

    case "small":
      // Smaller than 10,000 sq ft
      filtered = temples.filter((t) => t.area < 10000);
      pageTitle.textContent = "Small Temples";
      break;

    case "home":
    default:
      filtered = temples;
      pageTitle.textContent = "Home";
      break;
  }

  displayTemples(filtered);
}

// ===== Navigation click handling =====
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active class
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Close mobile menu
    mainNav.classList.remove("open");

    // Filter
    const filter = link.dataset.filter;
    filterTemples(filter);
  });
});

// ===== Hamburger menu =====
menuButton.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// ===== Footer =====
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// ===== Initial load – show all temples =====
filterTemples("home");