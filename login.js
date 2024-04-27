document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const users = await response.json();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          window.location.href = 'products.html';
        } else {
          alert('Invalid email or password');
        }
      } else {
        alert('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  