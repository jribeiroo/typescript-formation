export abstract class View<T>  { // 'T' generics   // abstract não permite criar instancia a não ser herdada da filha

protected elemento : HTMLInputElement;

constructor(seletor: string){
    this.elemento = document.querySelector(seletor);
}

update(model: T ): void {
    const template = this.template(model);
    this.elemento.innerHTML = template;
}

protected abstract template(model: T): string;
  
}