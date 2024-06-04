// Función para obtener los elementos del carrito desde el servidor
function getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
  
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.productId}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${item.price * item.quantity}</td>
          `;
          cartItemsContainer.appendChild(row);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Llamar a la función para obtener los elementos del carrito al cargar la página
  document.addEventListener('DOMContentLoaded', getCartItems);