const heap = [0, 95, 92, 85, 47, 90, 34, 20, 40, 46];
const prioridade = 95;
const novaPrioridade = 42;
let i = 1;
while(heap[i] !== prioridade) {
  i++;
}

heap[i] = novaPrioridade;

if (prioridade < novaPrioridade) {
  subir(i);
} else if (prioridade > novaPrioridade) {
  descer(i, heap.length)
}

function subir(i) {
  const j = Math.floor(i/2);
  if (j >= 0) {
    if (heap[i] > heap[j]) {
      const aux = heap[i];
      heap[i] = heap[j];
      heap[j] = aux;
      subir(j);
    }
  }
}

function descer(i, n) {
  let j = 2*i;
  if(j <= n) {
    if (j+1 <= n) {
      if (heap[j+1] > heap[j]) {
        j = j+1;
      }
    }
    if (heap[i] < heap[j]) {
      const aux = heap[i];
      heap[i] = heap[j];
      heap[j] = aux;
      // console.log(i, heap)
      descer(j, n);
    }
  }
}

function heapsort(a = [], n) {
  let i = n / 2, pai, filho, t;
  while(true) {
     if (i > 0) {
         i--;
         t = a[i];
     } else {
         n--;
         if (n <= 0) return;
         t = a[n];
         a[n] = a[0];
     }
     pai = i;
     filho = i * 2 + 1;
     while (filho < n) {
         if ((filho + 1 < n)  &&  (a[filho + 1] > a[filho]))
             filho++;
         if (a[filho] > t) {
            a[pai] = a[filho];
            pai = filho;
            filho = pai * 2 + 1;
         } else {
            break;
         }
     }
     a[pai] = t;
  }
}

heapsort(heap, heap.length);

console.log(heap);