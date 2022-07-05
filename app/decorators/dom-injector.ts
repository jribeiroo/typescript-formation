export function domInjector(seletor: string) {
    return function (target: any, propertyKey: string) {
        let elemento: HTMLElement;
        const getter = function () {
            //add cache
            if (!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor);
            }
            return elemento;
        }
        //sobrescreve 
        Object.defineProperty(
            target,
            propertyKey,
            { get: getter }
        );
    }
}