class No {
  constructor(valor) {
    this.valor = valor;
    this.esquerda = null;
    this.direita = null;
  }
}

class ArvoreBinariaCompleta {
  constructor() {
    this.raiz = null;
  }

  inserirEmOrdem(nos, inicio, fim) {
    if (inicio > fim) {
      return null;
    }
    const meio = Math.floor((inicio + fim) / 2);
    const novoNo = new No(nos[meio]);
    if (!this.raiz) {
      this.raiz = novoNo;
    }
    console.log(novoNo);
    novoNo.esquerda = this.inserirEmOrdem(nos, inicio, meio - 1);
    novoNo.direita = this.inserirEmOrdem(nos, meio + 1, fim);
    return novoNo;
  }

  inserirArray(arr) {
    arr.sort((a, b) => a - b);
    console.log(arr);
    this.inserirEmOrdem(arr, 0, arr.length - 1);
  }
}

// Exemplo de uso
const arr = [92, 85, 90, 47, 71, 34, 20, 40, 46];
const arvore = new ArvoreBinariaCompleta();
arvore.inserirArray(arr);

console.log("Árvore completa construída:");
// console.log(arvore.raiz);