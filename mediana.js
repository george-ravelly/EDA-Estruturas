const { arvore } = require("./arvore");

const arr = [92, 85, 90, 47, 71, 34, 20, 40, 46]

function getListaDeMedianas(listaOriginal = []) {
  listaOriginal.sort();
  const fila = [];

  function getMedian(lista = []) {
    const tam = lista.length;
    let index = -1;
    if (tam === 0) return;
    if (tam%2 === 1) {
      index = Math.trunc(tam/2);
    } else {
      index = tam/2;
    }
    fila.push(lista[index]);
    lista.splice(index, 1);
    getMedian(lista)
  }

  getMedian(listaOriginal);
  // const arvore = arvore();
  const tree = arvore()
  for (const elemento of fila) {
    tree.inserir(elemento);
  }
  return tree;
}

const res = getListaDeMedianas(arr);

res.percorrerArvorePorNiveisRecursiva();