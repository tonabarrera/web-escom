struct nodo {
    int dato;
    struct nodo *next;
}
void crear_nodo(int dato, struct nodo* elemento){
    elemento = (struct node*)malloc(sizeof(struct nodo));
    elemento->dato = dato;
    elemento->next = NULL;
}

void insertar(int posicion, struct nodo *lista, struct nodo *elemento) {
    struct nodo *temp = lista;
    if (posicion > 1) {
        for (int i = 1; i< posicion-1; i++){
            temp = temp->next;
        }
        elemento->next = temp->next;
        temp->next = elemento;
    } else if (posicion){
        temp->next = lista;
        lista = temp;
    }
}

void sacar(int posicion, struct nodo *lista) {
    if (lista == NULL)
        printf("**Lista vacia**\n");
    else {
        struct nodo *aux = lista;
        if (posicion > 1) {
            for (int i = 1; i< posicion-1; i++){
                aux = aux->next;
                if (aux->next == NULL)
                    return
            }
            struct nodo *temp = aux->next;
            aux->next = temp->next;
        } else if (posicion){
            temp = lista;
            lista = lista->next;
        }
        free(temp);
    }
}
