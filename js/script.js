// Inicializar variables
const shoppingCartModal = new bootstrap.Modal(document.getElementById('shoppingCartModal'));
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');

// Arreglo para almacenar los productos en el carrito
let cart = [];

// Función para agregar un producto al carrito
function addToCart(product) {
  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.find((p) => p.title === product.title);

  if (existingProduct) {
    // Si el producto ya está en el carrito, aumentar la cantidad
    existingProduct.quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    cart.push({ ...product, quantity: 1 });
  }

  // Actualizar el contenido del carrito en la página
  renderCart();

  // Mostrar el modal del carrito
  shoppingCartModal.show();
}

// Función para renderizar el contenido del carrito en la página
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

// Agregar event listeners a los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.card');
    const productTitle = productCard.querySelector('.card-title').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));

    const product = { title: productTitle, price: productPrice };
    addToCart(product);
  });
});

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
