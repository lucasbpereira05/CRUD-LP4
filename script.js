const modal = document.querySelector('.modal-container') //Retorna o primeiro elemento dentro do documento
const tbody = document.querySelector('tbody') // ou seja retorna o elemento que refencia a area
const sNome= document.querySelector('#m-nome')
const sTipo = document.querySelector('#m-tipo')
const sPreco = document.querySelector('#m-preco')
const sArea = document.querySelector('#m-area')
const sEndereco = document.querySelector('#m-endereco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active') //classListpropriedade retorna os nomes de classe CSS de um element

  //Uma referência ao objeto que enviou o evento.
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sTipo.value = itens[index].tipo
    sPreco.value = itens[index].preco
    sArea.value = itens[index].area
    sEndereco.value = itens[index].endereco
    id = index
  } else {
    sNome.value = ''
    sTipo.value = ''
    sPreco.value = ''
    sArea.value = ''
    sEndereco.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.tipo}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.area} m²</td>
    <td>${item.endereco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr) //Adiciona um nó ao final da lista de filhos de um nó pai especificado.
  // Se o nó já existir no documento, ele é removido de seu nó pai atual antes de ser adicionado ao novo pai.

  //<tbody>elemento é usado em conjunto com os elementos <thead> e <tfoot> para especificar cada parte de uma tabela (corpo, cabeçalho, rodapé).
}

btnSalvar.onclick = e => {
  if(sArea < 0){
    alert('colocar um valor válido')
    sArea = undefined;
  } 
  if(sArea < 0){
    alert('colocar um valor válido')
    sArea = undefined;
  } 
  
  if (sNome.value == '' || sTipo.value == '' || sPreco.value == '' || sArea.value == '' || sEndereco.value == '') {
    return
  }

  e.preventDefault(); // cancela o evento

  if (id !== undefined) {
    
  if(sArea < 0){
    alert('colocar um valor válido')
    sArea = undefined;
  } 
  if(sArea.value < 0){
    alert('colocar um valor válido')
    sArea.value = undefined;
  }
    itens[id].nome = sNome.value
    itens[id].tipo = sTipo.value
    itens[id].preco = sPreco.value
    itens[id].area = sArea.value
    itens[id].endereco = sEndereco.value
  } else {
    itens.push({'nome': sNome.value, 'tipo': sTipo.value, 'preco': sPreco.value, 'area': sArea.value, 'endereco': sEndereco.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}
// localStorage consiste em salvar, adicionar, recuperar ou excluir dados 
// localmente em um navegador Web, esta informação é 
// guardada na forma de pares de chave-valor e os valores podem ser apenas strings.
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()