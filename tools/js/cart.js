import { localStorageResult } from "./storage.js";
let show = localStorageResult();
console.log(show);
// نمایش مقدار محصول توی سبد خرید
function totalCart() {
  const totalCart = document.querySelector("#total-productCart");
  totalCart.innerHTML = `<p id="total-productCart">
<span><i class="fa-solid fa-cart-shopping"></i></span>
 Cart(${show.length})
</p>`;
}

const templateArticle = document.querySelector(".templateArticle");
// ساختار نمایشی ایتم ها
function templateCart(x) {
  // products-itme-Cart
  let divProduct = document.createElement("div");
  divProduct.classList.add("products-itme-Cart");
  divProduct.dataset.id = x.id;
  //   products-image-Cart
  let divImg = document.createElement("div");
  divImg.classList.add("products-image-Cart");
  let imgEle = document.createElement("img");
  imgEle.src = x.thumbnail;
  divImg.appendChild(imgEle);
  //   products-info-Cart
  let divInfo = document.createElement("div");
  divInfo.classList.add("products-info-Cart");
  let h3Ele = document.createElement("h3");
  let pEle1 = document.createElement("p");
  let pEle2 = document.createElement("p");
  let pEle3 = document.createElement("p");
  pEle2.classList.add("price");
  h3Ele.innerText = x.title;
  pEle1.innerText = x.category;
  pEle2.innerText = `$ ${x.price}`;
  pEle3.innerText = `Stock : ${x.stock}`;

  divInfo.appendChild(h3Ele);
  divInfo.appendChild(pEle1);
  divInfo.appendChild(pEle2);
  divInfo.appendChild(pEle3);
  // products-quantity
  let divQuantity = document.createElement("div");
  divQuantity.classList.add("products-quantity");
  let pEleQuantity = document.createElement("p");
  pEleQuantity.classList.add("quantity");
  pEleQuantity.innerText = `Quantity: ${x.quantity}`;
  divQuantity.appendChild(pEleQuantity);

  //   products-btn-Cart
  let divBtn = document.createElement("div");
  divBtn.classList.add("products-btn-Cart");
  let btnPlus = document.createElement("button");
  let btnMines = document.createElement("button");
  btnPlus.classList.add("edit");
  btnMines.classList.add("delete");
  btnPlus.addEventListener("click", function () {
    return PlusEle(this);
  });
  btnMines.addEventListener("click", function () {
    return MinesEle(this);
  });
  btnPlus.innerText = "+";
  btnMines.innerText = "-";
  divBtn.appendChild(btnPlus);
  divBtn.appendChild(btnMines);

  // append All Itme
  divProduct.appendChild(divImg);
  divProduct.appendChild(divInfo);
  divProduct.appendChild(divQuantity);
  divProduct.appendChild(divBtn);

  templateArticle.appendChild(divProduct);
}
// تابع اضافه کردن ایتم ها به صفحه
function addCartToWindo() {
  templateArticle.innerHTML = "";
  for (let itme of show) {
    templateCart(itme);
  }
  totalCart();
}
addCartToWindo();
// تابه نشون دادن قیمت کل
const totalPrice = document.querySelector("#total-price");
const totalOrder = document.querySelector(".totalOrder");
function showTotalPrice() {
  let totalSum = 0;
  for (let product of show) {
    let sum = product.price * product.quantity;
    totalSum = totalSum + sum;
    console.log(totalSum);
  }
  totalPrice.innerText = `Total Price : $ ${totalSum}`;
  totalOrder.innerText = `Total Price : $ ${totalSum}`;
}
showTotalPrice();
// دکمه زیاد کردن محصول
function PlusEle(ele) {
  let element = ele.parentElement.parentElement;
  let idPro = Number(element.dataset.id);

  const product = show.find((item) => item.id === idPro);
  product.quantity++;

  const quantityEle = element.querySelector(".quantity");
  quantityEle.innerText = `Quantity: ${product.quantity}`;
  let sumPrice = product.price * product.quantity;

  const priceEle = element.querySelector(".price");
  priceEle.innerText = `$ ${sumPrice}`;
  showTotalPrice();
  localStorage.setItem("cart", JSON.stringify(show));
  // addCartToWindo();
}
// دکمه کم کردن محصول
function MinesEle(ele) {
  let element = ele.parentElement.parentElement;
  let idPro = Number(element.dataset.id);

  const product = show.find((item) => item.id === idPro);
  product.quantity--;

  const quantityEle = element.querySelector(".quantity");
  quantityEle.innerText = `Quantity: ${product.quantity}`;

  let sumPrice = product.price * product.quantity;
  const priceEle = element.querySelector(".price");
  priceEle.innerText = `$ ${sumPrice}`;
  showTotalPrice();

  if (product.quantity == 0) {
    const products = show.filter((itme) => itme.id !== product.id);
    show = products;
    alert("این محصول از سبد خرید حذف شد ");
    addCartToWindo();
  }
  localStorage.setItem("cart", JSON.stringify(show));
}
const articleOrder = document.querySelector(".articleOrder");
const divMidleOrder = document.querySelector(".divMidleOrder");
// Checkout-btn
const CheckoutBtn = document.querySelector(".Checkout-btn");
CheckoutBtn.addEventListener("click", function () {
  if (show.length === 0) {
    console.log("Cart empty");
  } else {
    divMidleOrder.innerHTML = "";
    for (let itme of show) {
      articleOrder.classList.remove("dispNone");
      templateOrder(itme);
    }
    console.log("Cart Ready");
  }
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  console.log("ok");
  articleOrder.classList.add("dispNone");
});

function templateOrder(x) {
  // infoOrder
  let infoOrderEle = document.createElement("div");
  infoOrderEle.classList.add("infoOrder");
  let pEle1 = document.createElement("p");
  let pEle2 = document.createElement("p");
  pEle1.textContent = x.title;
  pEle2.textContent = `Quantity: ${x.quantity}`;
  infoOrderEle.appendChild(pEle1);
  infoOrderEle.appendChild(pEle2);
  divMidleOrder.appendChild(infoOrderEle);
}
const confirmBtn = document.querySelector(".confirm");
confirmBtn.addEventListener("click", function () {
  console.log("ok");
  show = [];
  localStorage.setItem("cart", JSON.stringify(show));
  alert("سفارش شما ثبت شد ");
  addCartToWindo();
  showTotalPrice();
  articleOrder.classList.add("dispNone");
});
