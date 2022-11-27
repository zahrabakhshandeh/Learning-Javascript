const filterBox = document.querySelectorAll(".filter-products");
const productsDOM = document.querySelector(".products-center");
const searchInput = document.querySelector("#search");
const modal = document.querySelector(".modal-container");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.querySelector(".modal-title");
const cancleBtn = document.querySelector(".cancel-btn");

document.addEventListener("DOMContentLoaded", getData);

let allProducts = []
function getData(){
	axios
		.get("http://localhost:3000/items")
		.then((res)=>{
			allProducts = res.data;
			//show all products
			showProducts();
		})
		.catch((err)=>console.log(err));
}

//show all or filtered products
function showProducts(filtered = allProducts){
	productsDOM.innerHTML = "";
	filtered.forEach((item) => {
	//create new div tag
    const productDiv = document.createElement("div");
    //add class to div tag
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <div class="img-container">
      <img src=${item.image} class="product-img" />
    </div>
    <div class="product-desc">
        <p class="product-price">$ ${item.price}</p>
        <p class="product-title">${item.title}</p>
    </div>
    `;
    //add to DOM
    productsDOM.appendChild(productDiv);
  });
	const products = document.querySelectorAll(".product");
  	modalDOM(products);
}

function filteredProducts(searchItem){
	//filter products based on searchItem
	const fiteredProduct = allProducts.filter((p)=>{
		return p.title.toLowerCase().includes(searchItem.toLowerCase());
	});
	//show filtered products
	showProducts(fiteredProduct);
}

//search 
searchInput.addEventListener("input", (e)=>{
	//filter products
	filteredProducts(e.target.value);
});

//select a category of products
filterBox.forEach((item)=>{
	item.addEventListener("click",(e)=>{
		//filter products
		filteredProducts(e.target.value);
	});
});

//modal
function modalDOM(products){
  products.forEach((p)=>{
    p.addEventListener("click", ()=>{
    //update image in modal
    modalImg.src = p.children[0].children[0].src;
    //update title in modal
    modalTitle.textContent = p.children[1].children[1].textContent;
    //show modal in DOM
    modal.classList.add("show");
    });
  });
}
//remove modal
cancleBtn.addEventListener(("click"), ()=>{
  modal.classList.remove("show");
});
