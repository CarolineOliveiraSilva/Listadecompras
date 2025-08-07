function salvarListas() {
  const categorias = ['alimentos', 'limpeza', 'higiene'];
  const dadosParaSalvar = {};

  categorias.forEach(cat => {
    const ul = document.getElementById(`lista-${cat}`);
    // Pega o texto de cada li (sem o botão)
    const itens = Array.from(ul.querySelectorAll('li label')).map(label => label.textContent.trim());
    dadosParaSalvar[cat] = itens;
  });

  localStorage.setItem('listasCompras', JSON.stringify(dadosParaSalvar));
}

// Carrega as listas salvas do LocalStorage
function carregarListas() {
  const dadosSalvos = localStorage.getItem('listasCompras');
  if (!dadosSalvos) return; // nada salvo ainda

  const listas = JSON.parse(dadosSalvos);

  Object.entries(listas).forEach(([categoria, itens]) => {
    const ul = document.getElementById(`lista-${categoria}`);
    ul.innerHTML = ''; // limpa lista atual

    itens.forEach(texto => {
      const li = document.createElement('li');
      li.innerHTML = `
        <label><input type="checkbox"> ${texto}</label>
        <button onclick="removerItem(this)" class="remover">🗑️</button>
      `;
      ul.appendChild(li);
    });
  });
}

// Função para adicionar item na lista (modificada para salvar após adicionar)
function adicionarItem() {
  const input = document.getElementById('novo-item');
  const categoria = document.getElementById('categoria').value;
  const valor = input.value.trim();

  if (valor === '') {
    alert('Digite um item válido.');
    return;
  }

  const novoItem = document.createElement('li');
  novoItem.innerHTML = `
    <label><input type="checkbox"> ${valor}</label>
    <button onclick="removerItem(this)" class="remover">🗑️</button>
  `;

  document.getElementById(`lista-${categoria}`).appendChild(novoItem);

  input.value = '';
  input.focus();

  salvarListas();
}

// Função para remover item e salvar
function removerItem(botao) {
  const item = botao.parentElement;
  item.remove();
  salvarListas();
}

// Chama carregarListas quando a página terminar de carregar
window.onload = carregarListas;