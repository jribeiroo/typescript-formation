import { View } from "./view.js"; //herança
export class NegociacoesView extends View {
    template(model) {
        //retorna no futuro o html necessario + dados pra popular a view
        return `
    <table class="table table-hover table-hover table-bordered">
    <thead>
        <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
        </tr>
    </thead>
    <tbody>
        ${model.lista().map(negociacao => {
            return `
            <tr>
                <td>${this.formatar(negociacao.data)}</td> 
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
            </tr>
            `;
        }).join('')} 
    </tbody>
    </table>
     `;
    }
    formatar(data) {
        return new Intl.DateTimeFormat()
            .format(data);
    }
}
