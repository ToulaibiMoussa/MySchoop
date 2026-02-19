import { produits } from "./Produit/produit.js";
import { initFilters } from "./filtre/filtre.js";
import { addToCart, updateCartUI } from "./cart.js";

const MesProduitContainer = document.querySelector(".product-galleries");

export function renderProducts(productsToRender) {
  MesProduitContainer.innerHTML = "";
  
  if (productsToRender.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.innerHTML = `
      <i class="fas fa-search"></i>
      <p>Aucun produit ne correspond à votre recherche</p>
    `;
    MesProduitContainer.appendChild(noResults);
    return;
  }

  productsToRender.forEach(item => {
    const card = document.createElement("div");
    card.className = 'item';
    card.innerHTML = `
      <div>
          <img src="${item.image}" alt="${item.id}">
          <div class="item-content">
              <h3>${item.id}</h3>
              <span>${item.prix}$</span>
                              
              <button class="add-to-cart" 
                      data-name="${item.id}" 
                      data-price="${item.prix}" 
                      data-image="${item.image}">
                  <i class="fas fa-cart-plus"></i>
                  Ajouter au panier
              </button>
          </div>
      </div>`;
    MesProduitContainer.appendChild(card);
  });
}

// Initial render
renderProducts(produits);

// Initialize filters
initFilters(produits, renderProducts);

// Initial Cart UI Update
updateCartUI();

// Event Delegation for "Add to Cart"
MesProduitContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".add-to-cart");
  if (button) {
    // Vérifier si le bouton n'est pas déjà en état "ajouté"
    if (button.classList.contains("added")) {
      return;
    }
    
    // Récupérer les données du produit depuis les attributs data
    const product = {
      id: button.dataset.name,
      prix: button.dataset.price,
      image: button.dataset.image
    };
    
    // Ajouter le produit au panier
    addToCart(product);
    
    // Feedback visuel : changer l'icône et le style du bouton
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = "fas fa-check";
    }
    
    // Ajouter la classe pour le style visuel
    button.classList.add("added");
    
    // Optionnel : Retirer le feedback après 0.8 secondes
    setTimeout(() => {
      if (icon) {
        icon.className = "fas fa-cart-plus";
      }
      button.classList.remove("added");
    }, 800);
  }
});


