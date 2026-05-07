let cart = [];

const productParent = document.getElementById("product-parent");
const cartContainer = document.getElementById("cart-container");
const total = document.getElementById("cart-total");
const count = document.getElementById("cart-count");

products.forEach((p) => {
  productParent.innerHTML += `
    <div class="product-container">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₱${p.price}</p>
      <button class="add-button" onclick="addToCart(${p.id})">
        Add to Cart
      </button>
    </div>
  `;
});

// add to cart
function addToCart(id) {
  let item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    let product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  showCart();
}

// show cart
function showCart() {
  cartContainer.innerHTML = "";

  let cartTotal = 0;
  let itemCount = 0;

  cart.forEach(item => {
    let sub = item.price * item.qty;

    cartTotal += sub;
    itemCount += item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₱${item.price}</p>
        <p>Qty: ${item.qty}</p>
        <p>Subtotal: ₱${sub}</p>

        <button onclick="item.qty++; showCart()">+</button>

        <button onclick="
          item.qty--;
          if(item.qty == 0) removeItem(${item.id});
          showCart();
        ">-</button>

        <button class="remove" onclick="removeItem(${item.id})">
          Remove
        </button>
      </div>
    `;
  });

  total.innerText = cartTotal;
  count.innerText = itemCount;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}

// remove item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  showCart();
}

// clear cart
document.getElementById("clear-cart").onclick = () => {
  cart = [];
  showCart();
};