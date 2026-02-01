const PRODUCT_LS_KEY = 'basket';

const totalPrice = document.querySelector('.js-total-price');
const clear = document.querySelector('.js-clear');
const container = document.querySelector('.js-list');

const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) || [];
let totalCost;

if (products.length) {
  clear.hidden = false;
  totalCost = products.reduce((acc, item) => acc + item.price * item.qty, 0);
}

totalPrice.textContent = totalCost
  ? `Total cost ${totalCost} грн`
  : 'Your basket is empty';

function createMarkup(arr) {
  return arr
    .map(
      ({ id, img, name, price, qty }) => `
        <li class="cart-item" data-id="${id}">
            <img src="${img}" alt="${name}" class="product-img"/>
            <h2>${name}</h2>
            <p>Quantoty: ${qty}</p>
            <p>Total price: ${price * qty} грн</p>
            <button>x</button>
        </li>
    `
    )
    .join('');
}
container.insertAdjacentHTML('beforeend', createMarkup(products));

clear.addEventListener('click', handlerClear);
function handlerClear(event) {
  localStorage.removeItem(PRODUCT_LS_KEY);
  window.location.href = '../index.html';
}

container.addEventListener('click', handlClick);
function handlClick(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const product = event.target.closest('.cart-item');
  const productId = Number(product.dataset.id);
  const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY));
  const newProducts = products.filter(item => item.id !== productId);

  totalCost = newProducts.reduce((acc, item) => acc + item.price * item.qty, 0);
  totalPrice.textContent = totalCost
    ? `Total cost ${totalCost} грн`
    : 'Your basket is empty';
  if (newProducts.length === 0) {
    clear.hidden = true;
  }
  container.innerHTML = createMarkup(newProducts);
  localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(newProducts));
}
