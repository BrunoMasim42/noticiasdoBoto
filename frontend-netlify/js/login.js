document.getElementById('formLogin').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');

  try {
    const response = await fetch('https://seu-backend.up.railway.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      mensagem.className = 'alert alert-success';
      mensagem.textContent = 'Login bem-sucedido! Redirecionando...';
      mensagem.classList.remove('d-none');
      setTimeout(() => { window.location.href = 'painel.html'; }, 1500);
    } else {
      mensagem.className = 'alert alert-danger';
      mensagem.textContent = data.mensagem || 'Erro no login';
      mensagem.classList.remove('d-none');
    }

  } catch (err) {
    mensagem.className = 'alert alert-danger';
    mensagem.textContent = 'Erro ao conectar com o servidor';
    mensagem.classList.remove('d-none');
  }
});
