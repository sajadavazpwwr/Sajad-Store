export function localStorageResult() {
  let showCart = localStorage.getItem("cart");
  let result = JSON.parse(showCart);
  return result;
}
