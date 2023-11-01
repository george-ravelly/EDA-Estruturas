class No {
  constructor(value) {
    this.value = value;
    this.pEsq = null;
    this.pDir = null;
  }
}

const arvore = {
    raiz: null,
    buscar(node, value, found) {
      if (node !== null) {
        if (node.value === value) {
          found = 1;
        } else {
          if (node.value > value) {
            if (node.pEsq === null) {
              found = 2;
            } else {
              node = node.pEsq;
            }
          } else {
            if (node.pDir === null) {
              found = 3;
            } else {
              node = node.pDir;
            } 
          }
          if (found < 1) {
            return this.buscar(node, value, found);
          }
        }
      }
      return {found, node};
    },
    inserir(value, found = 0, node = this.raiz) {
      const resultado = this.buscar(node, value, found);
      // console.log("1", resultado);
      found = resultado.found;
      node = resultado.node;
      if (found === 1) {
        console.log("Elemento já existe", value);
      } else {
        const novoNo = { value: null, pEsq: null, pDir: null };
        novoNo.value = value;
        if (found === 0) this.raiz = novoNo;
        else {
          if (found === 2) node.pEsq = novoNo;
          else node.pDir = novoNo;
        }
      }
    },

    remover(value, pai = this.raiz, node = this.raiz) {
      if (!node) return;

      if (node.value === value) {
        // Caso 1: Nó é folha
        if (!node.pEsq && !node.pDir) {
          if (pai?.pEsq?.value === value) pai.pEsq = null;
          else if (pai?.pDir?.value === value) pai.pDir = null;
        }
        // Caso 2: Nó possui dois ou mais filhos
        else if (node.pEsq && node.pDir) {
          let maiorEsq = node.pEsq;
          let p = node;
          while(maiorEsq.pDir) {
            p = maiorEsq;
            maiorEsq = maiorEsq.pDir;
          }
          
          maiorEsq.pDir = new No(node.value);

          p.pDir = maiorEsq.pEsq;

          node.value = maiorEsq.value;

          this.remover(value, maiorEsq, maiorEsq.pDir);
        }
        // Caso 3: Nó possui apenas um filho
        else {
          if (node.pEsq) pai.pEsq = node.pEsq;
          else if (node.pDir) pai.pDir = node.pDir;
        }
      } else {
        if (value > node.value && node.pDir) this.remover(value, node, node.pDir);
        else if (value < node.value && node.pEsq) this.remover(value, node, node.pEsq);
      }
    },

    percorrerArvorePorNiveisRecursiva(raiz) {
      const fila = [raiz];
      function recursiva(fila = []) {
        const noAtual = fila.shift();
        console.log(noAtual);
        
        if (noAtual?.pEsq) {
          fila.push(noAtual?.pEsq); // Adicione o filho esquerdo à fila
        }
        if (noAtual?.pDir) {
          fila.push(noAtual?.pDir); // Adicione o filho direito à fila
        }
        if (fila.length > 0) recursiva(fila);
      }
    
      recursiva(fila);
    },

    imprimirArvore(node, prefix = "", isEsquerda = false) {
      if (node) {
        console.log(
          prefix + (isEsquerda ? "├── " : "└── ") + node.value
        );
    
        const novoPrefix = prefix + (isEsquerda ? "│   " : "    ");
        this.imprimirArvore(node.pEsq, novoPrefix, true);
        this.imprimirArvore(node.pDir, novoPrefix, false);
      }
    },

    inserirEmOrdem(nos, inicio, fim) {
      if (inicio > fim) {
        return null;
      }

      const meio = Math.floor((inicio + fim) / 2);
      const novoNo = new No(nos[meio]);
      if (!this.raiz) {
        this.raiz = novoNo;
      }
      // [92, 85, 90, 47, 71, 34, 20, 40, 46]
      // [20, 34, 40, 46, 47, 71, 85, 90, 92]
      const esquerda = this.inserirEmOrdem(nos, inicio, meio - 1);
      if (esquerda) this.inserir(esquerda, 0);
      const direita = this.inserirEmOrdem(nos, meio + 1, fim)
      if (direita) this.inserir(direita, 0);

      return novoNo.value;
    },
    inserirArray(arr) {
      arr.sort((a, b) => a - b);
      console.log(arr);
      this.inserirEmOrdem(arr, 0, arr.length - 1);
    }
}

// const arr = [92, 85, 90]
const arr = [92, 85, 90, 47, 71, 34, 20, 40, 46]

function getListaDeMedianas(listaOriginal = []) {
  listaOriginal.sort();
  const fila = [];

  function getMedian(lista = []) {
    const tam = lista.length;
    let index = -1;
    if (tam > 0) {
      if (tam%2 === 1) {
        index = Math.trunc(tam/2);
      } else {
        index = tam/2;
      }
      fila.push(lista[index]);
      lista.splice(index, 1);
      getMedian(lista)
    }
  }
  getMedian(listaOriginal);

  return fila;
}



function criarArvoreComMedianas (arr = []) {
  console.log("Array original \n", arr);
  const res = getListaDeMedianas(arr); // O(NlogN)
  console.log("Array de medianas \n", res);
  res.forEach(f => { //n
    arvore.inserir(f) // n + logn
  })
  console.log("Percorrimento por nivel da arvore resultante!\n");
  arvore.percorrerArvorePorNiveisRecursiva(arvore.raiz); // n
}

function criarArvoreSemMedianas (arr = []) {
  console.log("Array original \n", arr);
  arr.forEach(f => arvore.inserir(f))
  console.log("Percorrimento por nivel da arvore resultante!\n");
  arvore.imprimirArvore(arvore.raiz);
  arvore.percorrerArvorePorNiveisRecursiva(arvore.raiz);
}

// criarArvoreSemMedianas(arr);
arvore.inserirArray(arr);
arvore.remover(71);
arvore.imprimirArvore(arvore.raiz);
// arvore.percorrerArvorePorNiveisRecursiva(arvore.raiz);
// console.log(arvore.raiz);