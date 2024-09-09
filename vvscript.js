document.addEventListener("DOMContentLoaded", () => {
  let productsContainer = document.getElementById("products-container");
  let cartSection = document.getElementById("cart-section");
  let cartIcon = document.getElementById("cart-icon");
  let closeCartButton = document.getElementById("close-cart");
  let cart = [];

  if (productsContainer) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        products.forEach((product) => {
          let productHtml = `
                    <div class="product">
                        <div class="image-container">
                            <img src="${
                              product.image
                            }" class="prod-image" alt="${product.title}">
                        </div>
                        <section id="box">
                            <div>
                                <div class="details">
                                    <h2 class="product-title">${
                                      product.title
                                    }</h2>
                                    <p class="product-price">$${product.price.toFixed(
                                      2
                                    )}</p>
                                </div>
                                <button class="cart-btn" data-id="${
                                  product.id
                                }">
                                    Add to cart
                                </button>
                            </div>
                        </section>
                    </div>
                    `;
          productsContainer.insertAdjacentHTML("beforeend", productHtml);
        });

         document.querySelectorAll(".cart-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            const product = products.find((p) => p.id == productId);
            addToCart(product);
          });
        });
      })
      .catch((error) => console.log("Error fetching products", error));
  }

   function addToCart(product) {
    cart.push(product);
    alert(`${product.title} added to cart!`);
    updateCartDisplay();
  }

   function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    alert(`Item removed from cart!`);
    updateCartDisplay();
  }

   
  function updateCartDisplay() {
    let cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";  

    if (cart.length > 0) {
      cart.forEach((item) => {
        let cartItemHtml = `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-item-image" alt="${
          item.title
        }">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <button class="remove-btn" data-id="${
                          item.id
                        }">Remove</button>
                    </div>
                </div>
                `;
        cartContainer.insertAdjacentHTML("beforeend", cartItemHtml);
      });

       
      document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productId = parseInt(e.target.getAttribute("data-id"));
          removeFromCart(productId);
        });
      });
    } else {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
  }

   
  cartIcon.addEventListener("click", () => {
    cartSection.classList.remove("hidden");
  });

   
  document.addEventListener("click", (e) => {
    if (!cartSection.contains(e.target) && !cartIcon.contains(e.target)) {
      cartSection.classList.add("hidden");
    }
  });
});
