function percorrerArvorePorNiveis(raiz) {
  if (!raiz) {
    return; // Tratar árvore vazia
  }

  const fila = []; // Inicialize uma fila vazia
  fila.push(raiz); // Adicione a raiz à fila
  // [1, ]
  while (fila.length > 0) {
    const noAtual = fila.shift(); // Remova o nó da parte frontal da fila
    console.log(noAtual.valor); // Visite o nó (imprimir o valor)

    if (noAtual.esquerda) {
      fila.push(noAtual.esquerda); // Adicione o filho esquerdo à fila
    }
    if (noAtual.direita) {
      fila.push(noAtual.direita); // Adicione o filho direito à fila
    }
  }
}

// Exemplo de uso
class No {
  constructor(valor, esquerda = null, direita = null) {
    this.valor = valor;
    this.esquerda = esquerda;
    this.direita = direita;
  }
}

const raiz = new No("A");
raiz.esquerda = new No('B');
raiz.direita = new No('C');
raiz.esquerda.esquerda = new No('D');
raiz.esquerda.esquerda.direita = new No('J');
raiz.esquerda.direita = new No('H');
raiz.direita.esquerda = new No('E');
raiz.direita.direita = new No('F');
raiz.direita.direita.esquerda = new No('I');

console.log("Percorrendo a árvore por níveis:");
percorrerArvorePorNiveis(raiz);


function percorrerArvorePorNiveisRecursiva(raiz) {
  const fila = [raiz];
  function recursiva(fila = []) {
    const noAtual = fila.shift();
    console.log(noAtual.valor);
    
    if (noAtual.esquerda) {
      fila.push(noAtual.esquerda); // Adicione o filho esquerdo à fila
    }
    if (noAtual.direita) {
      fila.push(noAtual.direita); // Adicione o filho direito à fila
    }
    if (fila.length > 0) recursiva(fila);
  }

  recursiva(fila);
}

console.log("Percorrendo a árvore por níveis recursivamente:");
percorrerArvorePorNiveisRecursiva(raiz);