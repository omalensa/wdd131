// Product Array (from the assignment)
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate the Product Name <select>
const selectElement = document.getElementById("product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;          // value = id (per assignment JS instructions)
  option.textContent = product.name;  // display text = name
  selectElement.appendChild(option);
});

// Footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;