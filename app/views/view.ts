export abstract class View<T>  { // 'T' generics   // abstract não permite criar instancia a não ser herdada da filha

    protected elemento: HTMLInputElement;
    private escapar = false

    constructor(seletor: string, escapar: boolean) {
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLInputElement;
        }else{
            throw new Error(`Seletor ${seletor} não encontrado: `);
        }
        // this.elemento = document.querySelector(seletor);
    }

    public update(model: T): void {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, ''); // 
        }
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;

}