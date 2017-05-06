struct nodo {
    int dato;
    struct nodo *next;
}
struct nodo *stack = NULL;
void crear_nodo(int valor, struct nodo *temp) {
    temp = (struct node*)malloc(sizeof(struct node));
    temp->dato = valor;
    temp->next = NULL;
    return;
}

void pop(struct *nodo stack) {
    struct nodo *temporal;
    if (stack == NULL)
        printf("**Pila vacia**\n");
    else {
        temp = stack;
        stack = stack->next;
        free(temp);
    }
    return;
}

void push(struct nodo *temp, struct nodo *stack){
    temp->next = stack;
    stack = temp;
    return;
}
