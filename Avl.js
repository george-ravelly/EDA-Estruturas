class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Função para calcular a altura de uma árvore a partir de um nó
function altura(node) {
  if (node === null) {
    return 0;
  }
  const altura_esquerda = altura(node.left);
  const altura_direita = altura(node.right);

  return 1 + Math.max(altura_esquerda, altura_direita);
}

// Função para verificar se uma árvore é AVL
function eAVL(node) {
  if (node === null) {
    return true;
  }

  // Calcula a altura das subárvores esquerda e direita
  const altura_esquerda = altura(node.left);
  const altura_direita = altura(node.right);

  // Calcula o fator de equilíbrio do nó atual
  const fator_equilibrio = Math.abs(altura_esquerda - altura_direita);

  // Verifica se o fator de equilíbrio excede 1
  if (fator_equilibrio > 1) {
    return false;
  }

  // Recursivamente verifica as subárvores
  if (!eAVL(node.left) || !eAVL(node.right)) {
    return false;
  }

  return true;
}

// Exemplo de uso:
const raiz = new TreeNode(10);
raiz.left = new TreeNode(5);
raiz.right = new TreeNode(15);
raiz.left.left = new TreeNode(3);
raiz.right.right = new TreeNode(15);
raiz.left.left.left = new TreeNode(1);
raiz.left.right = new TreeNode(7);

const e_avl = eAVL(raiz);
if (e_avl) {
  console.log("A árvore é AVL");
} else {
  console.log("A árvore não é AVL");
}