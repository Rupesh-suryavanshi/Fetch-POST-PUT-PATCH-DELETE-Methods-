document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        alert('Sign up successful!');
        window.location.href = 'login.html';
      } else {
        alert('Sign up failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  