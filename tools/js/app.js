import { localStorageResult } from "./storage.js";

const articleEleProduct = document.querySelector(".products-box");
function templateProduct(x) {
  // product itme
  let divEle = document.createElement("div");
  divEle.classList.add("products-itme");
  divEle.dataset.id = x.id;
  // image box
  let divImageEle = document.createElement("div");
  let imgEle = document.createElement("img");
  divImageEle.classList.add("products-image");
  imgEle.src = x.thumbnail;
  imgEle.alt = x.title;
  divImageEle.appendChild(imgEle);
  divEle.appendChild(divImageEle);
  //   product info
  let divInfoEle = document.createElement("div");
  let h3Ele = document.createElement("h3");
  let pEle1 = document.createElement("p");
  let pEle2 = document.createElement("p");
  let pEle3 = document.createElement("p");
  divInfoEle.classList.add("products-info");
  h3Ele.innerText = x.title;
  pEle1.innerText = x.category;
  pEle2.innerText = `${x.price} $`;
  pEle3.innerText = `Stock: ${x.stock}`;
  divInfoEle.appendChild(h3Ele);
  divInfoEle.appendChild(pEle1);
  divInfoEle.appendChild(pEle2);
  divInfoEle.appendChild(pEle3);
  divEle.appendChild(divInfoEle);
  // product btn
  let divBtnEle = document.createElement("div");
  let btnEle = document.createElement("button");
  divBtnEle.classList.add("products-btn");
  btnEle.innerText = "Add to Cart";
  btnEle.classList.add("addToCart");
  btnEle.addEventListener("click", function () {
    return addToCartBtn(this);
  });
  divBtnEle.appendChild(btnEle);
  divEle.appendChild(divBtnEle);

  articleEleProduct.appendChild(divEle);
}

const mptyEle = document.querySelector(".mpty");
function alertEmpty() {
  mptyEle.innerHTML = "";
  let divEle = document.createElement("div");
  let pEle1 = document.createElement("p");
  let pEle2 = document.createElement("p");
  divEle.classList.add("alertProduct");
  pEle1.textContent = "No product found";
  pEle2.innerHTML = "&#128528;&#128580;";
  divEle.appendChild(pEle1);
  divEle.appendChild(pEle2);
  mptyEle.appendChild(divEle);
}
import { productsUrl } from "./api.js";
let allProducts = [];
async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    if (!response.ok) {
      throw new Error("Request failde");
    } else {
      const showResponse = await response.json();
      allProducts = showResponse.products;
      articleEleProduct.innerHTML = "";
      for (let product of showResponse.products) {
        templateProduct(product);
      }
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Api Get Done");
  }
}
getProducts();
const searchInp = document.querySelector("#search");
searchInp.addEventListener("input", function () {
  console.log(searchInp.value);
  console.log(allProducts);
  let allProductsFil = allProducts.filter((products) =>
    products.title.toLowerCase().includes(searchInp.value.toLowerCase()),
  );
  if (searchInp.value == "") {
    mptyEle.innerHTML = "";
    getProducts();
  } else if (allProductsFil.length > 0) {
    articleEleProduct.innerHTML = "";
    mptyEle.innerHTML = "";
    for (let product of allProductsFil) {
      templateProduct(product);
    }
  } else if (allProductsFil.length == 0) {
    articleEleProduct.innerHTML = "";
    alertEmpty();
  }
});

window.onload = () => {
  let show = localStorageResult();
  console.log(show);
  if (show == null) {
    return;
  } else {
    for (let item of show) {
      cart.push(item);
      totalCart(show);
    }
  }
};
let cart = [];
function addToCartBtn(ele) {
  let par = ele.parentElement.parentElement;
  let idEle = Number(par.dataset.id);
  const product = allProducts.find((item) => item.id === idEle);
  const newCart = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    category: product.category,
    stock: product.stock,
    quantity: 1,
  };
  const existProduct = cart.find((item) => item.id === newCart.id);
  if (existProduct) {
    alert("محصول تکراری ");
    return;
  }
  cart.push(newCart);
  alert("محصول اضافه شد به سبد خرید");
  totalCart(cart);
  console.log(cart);
  console.log(newCart);

  console.log(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function totalCart(x) {
  const totalCart = document.querySelector("#total-productCart");

  totalCart.innerHTML = `<p id="total-productCart">
  <span><i class="fa-solid fa-cart-shopping"></i></span>
   Cart(${x.length})
  </p>`;
}
