const productsData = [
  {
    id: 1,
    title: "laptop1",
    price: 10.99,
    imageUrl: "./images/product-1.jpeg",
  },
  {
    id: 2,
    title: "laptop2",
    price: 14.99,
    imageUrl: "./images/product-2.jpeg",
  },
  {
    id: 3,
    title: "laptop3",
    price: 7.99,
    imageUrl: "./images/product-3.jpeg",
  },
  {
    id: 4,
    title: "laptop4",
    price: 11.99,
    imageUrl: "./images/product-4.jpeg",
  },
  {
    id: 5,
    title: "laptop5",
    price: 4.99,
    imageUrl: "./images/product-5.jpeg",
  },
  {
    id: 6,
    title: "laptop6",
    price: 23.99,
    imageUrl: "./images/product-6.jpeg",
  },
  {
    id: 7,
    title: "laptop7",
    price: 42.99,
    imageUrl: "./images/product-7.jpeg",
  },
  {
    id: 8,
    title: "laptop8",
    price: 24.99,
    imageUrl: "./images/product-8.jpeg",
  },
];


const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const allProducts = document.querySelector(".products-center");

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
let cart = [];
class Products{
  static getProducts(){
    return productsData;
  }
}

class Ui{
  static showProducts(products){
    products.forEach((product)=>{
       const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <div class="img-container">
              <img src=${product.imageUrl} class="product-img" />
            </div>
            <div class="product-desc">
              <p class="product-price">$ ${product.price}</p>
              <p class="product-title">${product.title}</p>
            </div>
            <button class="btn add-to-cart" id=${product.id}>add to cart</button>`;
        allProducts.appendChild(div);
      });
  }

  static getCartBtns(){
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    addToCartBtns.forEach((item)=>{
      item.addEventListener("click",(e)=>{
        const id = item.id;
        console.log(id);
        const addedP = {...Storage.getProduct(id), quantity: 1};
        cart.push(addedP);
        this.setCartValue(cart);
        Storage.saveCart(cart);
      });
    });
  }

  static setCartValue(cart){
    let count = 0;
    const totalPrice = cart.reduce((previous, current)=>{
      count += current.quantity;
      return current.quantity * current.price + previous;
    }, 0);
    cartItems.innerHTML = count;
    cartTotal.innerHTML = `total price : ${totalPrice} $`;
  }

  static addCartItem(cart) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<div><img class="cart-item-img" src=${cart.imageUrl} /></div>
   <div class="cart-item-desc">
     <h4>${cart.title}</h4>
     <h5>$ ${cart.price}</h5>
   </div>
   <i class="fas fa-trash remove-item" data-id=${cart.id}></i>
   `;
    cartContent.appendChild(div);
  }
}

class Storage{
  static saveProducts(products){
    localStorage.setItem("products",JSON.stringify(products));
  }
  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    //console.log(products);
    return products.find((p) => p.id == id);
  }
  //
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

}


document.addEventListener("DOMContentLoaded", ()=>{
    const list = Products.getProducts();
    Ui.showProducts(list);
    Ui.getCartBtns();
    Storage.saveProducts(list);
});

function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "20%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
}