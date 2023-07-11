const productsContainer = document.querySelector(".products_Container");
const showMoreBtn = document.querySelector(".second-btn");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const productCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


const createProductTemplate = (product) => {
  const {id, name, ibu, category, userImg, price} = product;
  return `
  <div class="product">
    <div class="card">
      <div class="flip-card-inner">
        <div class="card-front">
          <img src=${userImg} alt=${name} >
            <hr />
            <br>
            <h3>${name}</h3>
        </div>

            <div class="card-back">
              <ul>
                <li>${id} </li>
                <li>${ibu} </li>
                <li>${category} </li>
                <li>Mansa y de amargo apaciguado.</li>
                <li>Cerveza en la que resalta el dulzor de las maltas,sin dejar afuera los aromas otorgados por el lúpulo.</li>
                <li>Temperatura ideal 6°C</li>
              </ul>
              <a class="button-card">${price} </a>
            </div>
      </div>
    </div>
  </div>
  `;
};


const renderProducts = (productsList) => {
  productsContainer.innerHTML = productsList
  .map(createProductTemplate)
  .join("");
};


const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
  if(!barsMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnClick = () => {
  if(!e.target.classList.contains("navbar-link")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("opne-cart");
  overlay.classList.remove("show-overlay");
};




const createCartProductTemplate = (cartProduct) => {
  const {id, name, price, img, quantity} = cartProduct;
  return ` 
  <div class="cart-item">
    <div class="item-info">
      <h3 class="item-tittle">${name} </h3>
      <p class="item-beer">shop</p>
      <span class="item-price">${price} </span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id} >-</span>
      <span class="item-quantity">${quantity} </span>
      <span class="quantity-handler up" data-id=${id} >+</span>
    </div>
  </div>`;
};



const renderCart = () => {
  if(!cart.length) {
    productCart.innerHTML= `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productCart.innerHTML = cart.map(createCartProductTemplate).join("");

};

const getCartTotal = () => {
  return cart.reduce((acc, val) => {
    return acc + Number(val.price) * val.quantity;
  }, 0)
};

const showCartTotal = () => {
  total.innerHTML = `${getCartTotal()}`;
};

const createProductData = (product) => {
  const {id, name, price, userImg} = product;
  return {id, name, price, userImg}
};

const isExistingCartProduct =(product) => {
  return cart.find((item) => {
    return item.id === product.id;
  });
};

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
    ? {...cartProduct, quantity: cartProduct.quantity + 1 }
    : cartProduct;
  });
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

const createCartProduct = () => {
  cart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled")
  }
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc,val) => {
    return acc + val.quantity;
  }, 0);
};

const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble;
};

const addProduct = (e) => {
  if(!e.target.classList.contains("button-card")) {
    return;
  }
  const product = createProductData(e.target.dataset);
  if (isExistingCartProduct (product.id)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else{
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  updateCartState();
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => {
    return product.id !== existingProduct.id;
  });
  updateCartState();
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
    ? {...product, quantity: Number (product.quantity) - 1
    }
    : product;
  });
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  if(existingCartProduct.quantity === 1) {
    if(window.confirm("Desea eliminar producto del carrito?")) {
      removeProductFromCart(existingCartProduct)
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct)
};

const handleQuantity =(e) => {
  if(e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.id);
  }else if (e.target.classList.contains("up")) {
  handlePlusBtnEvent(e.target.id)
  }
  updateCartState();
};

const resetCartItem = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if(window.confirm (confirmMsg)){
    alert(successMsg);
  }
};

const completeBuy = () => {
completeCartAction("Desea completar su compra?", "GRAcias por su compra!")
}

const deleteCart = () => {
  completeCartAction(
    "desea vaciar el carrito?",
    "no hay productos en el carrito"
  );
};

const init = () => {
  renderProducts(appState.products[appState.currentProductsIndex]);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  productCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart)
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

init();