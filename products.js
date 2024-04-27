document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      document.getElementById('user-info').textContent = `Logged in as: ${loggedInUser.name}`;
    }
    fetchProducts();
  });
  
  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (response.ok) {
        const products = await response.json();
        displayProducts(products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayProducts(products) {
    const productsList = document.getElementById('products-list');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.src}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.ratings}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="deleteFromCart(${product.id})">Delete from Cart</button>
      `;
      productsList.appendChild(productCard);
    });
  }
  
  async function addToCart(productId) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Please login to add items to cart');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/allUsersCart/${loggedInUser.name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId,
                
            }),
        });
        if (response.ok) {
            alert('Product added to cart');
        } else {
            alert('Failed to add product to cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteFromCart(productId) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Please login to delete items from cart');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/alluserscart/${loggedInUser.name}/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Product deleted from cart');
        } else {
            const errorData = await response.json(); // Assuming the server returns error details in JSON format
            alert(`Failed to delete product from cart: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete product from cart. Please try again later.');
    }
}
  