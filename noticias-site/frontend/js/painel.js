const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));
const mensagem = document.getElementById('mensagem');
const listaNoticias = document.getElementById('listaNoticias');

if (!token || !usuario) {
  window.location.href = 'login.html';
} else {
  document.getElementById('usuarioNome').textContent = `Bem-vindo, ${usuario.nome}`;
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

document.getElementById('formNoticia').addEventListener('submit', async function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const imagem = document.getElementById('imagem').value;
  const categoria = document.getElementById('categoria').value;
  const texto = document.getElementById('texto').value;

  try {
    const response = await fetch('http://localhost:3000/api/noticias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ titulo, imagem, categoria, texto })
    });

    const data = await response.json();

    if (response.ok) {
      mensagem.className = 'alert alert-success';
      mensagem.textContent = 'Notícia publicada com sucesso!';
      mensagem.classList.remove('d-none');
      this.reset();
      carregarNoticias();
    } else {
      mensagem.className = 'alert alert-danger';
      mensagem.textContent = data.mensagem || 'Erro ao publicar';
      mensagem.classList.remove('d-none');
    }
  } catch (err) {
    mensagem.className = 'alert alert-danger';
    mensagem.textContent = 'Erro ao conectar com o servidor';
    mensagem.classList.remove('d-none');
  }
});

async function carregarNoticias() {
  listaNoticias.innerHTML = '';

  try {
    const res = await fetch('http://localhost:3000/api/noticias');
    const noticias = await res.json();

    noticias.forEach(noticia => {
      const card = document.createElement('div');
      card.className = 'col-md-6 mb-3';
      card.innerHTML = `
        <div class="card h-100">
          ${noticia.imagem ? `<img src="${noticia.imagem}" class="card-img-top" alt="${noticia.titulo}">` : ''}
          <div class="card-body">
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-text">${noticia.texto}</p>
            <span class="badge bg-secondary">${noticia.categoria}</span>
          </div>
        </div>`;
      listaNoticias.appendChild(card);
    });

  } catch (err) {
    listaNoticias.innerHTML = `<p class="text-danger">Erro ao carregar notícias.</p>`;
  }
}

carregarNoticias();
