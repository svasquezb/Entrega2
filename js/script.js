// Agregar evento para abrir el modal del carrito
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const shoppingCartModal = new bootstrap.Modal(document.getElementById('shoppingCartModal'));
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.card');
    const productTitle = productCard.querySelector('.card-title').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));

    const existingProduct = cart.find(item => item.title === productTitle);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ title: productTitle, price: productPrice, quantity: 1 });
    }

    renderCart();
    shoppingCartModal.show();
  });
});

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `${item.title} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
    cartList.appendChild(listItem);

    total += item.price * item.quantity;
  });

  totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Efecto de desplazamiento suave al hacer clic en enlaces de la navegación
const navLinks = document.querySelectorAll('.navbar-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight,
      behavior: 'smooth'
    });
  });
});