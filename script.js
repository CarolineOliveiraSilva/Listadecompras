function salvarListas() {
  const categorias = ['alimentos', 'limpeza', 'higiene'];
  const dadosParaSalvar = {};

  categorias.forEach(cat => {
    const ul = document.getElementById(`lista-${cat}`);

    const itens = Array.from(ul.querySelectorAll('li label')).map(label => label.textContent.trim());
    dadosParaSalvar[cat] = itens;
  });

  localStorage.setItem('listasCompras', JSON.stringify(dadosParaSalvar));
}


function carregarListas() {
  const dadosSalvos = localStorage.getItem('listasCompras');
  if (!dadosSalvos) return

  const listas = JSON.parse(dadosSalvos)

  Object.entries(listas).forEach(([categoria, itens]) => {
    const ul = document.getElementById(`lista-${categoria}`)
    ul.innerHTML = '' 

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


function removerItem(botao) {
  const item = botao.parentElement;
  item.remove();
  salvarListas();
}


window.onload = carregarListas;