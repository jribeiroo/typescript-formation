import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true); //renderiza table vinda do html
    private mensagemView = new MensagemView('#mensagemView', false);
    private readonly SABADO = 6 ;
    private readonly DOMINGO = 0 ;

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(  // instancia da classe negociacao com public static
            this.inputData.value, 
            this.inputQuantidade.value, 
            this.inputValor.value
            );
            if (!this.ehDiaUtil(negociacao.data)) {
                this.mensagemView.update('Somente negociações em dias úteis, por favor!');
                return;
            }
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView(); 
    }

    public importaDados(): void {
        //chamda de api com fetch do navegador
        fetch('http://localhost:8080/dados')
        //convert para json
       .then( res => res.json())
       .then((dados: any[]) => {
       return dados.map(dadoDeHoje => {
            return new Negociacao(
                new Date(), 
                dadoDeHoje.vezes, 
                dadoDeHoje.montante
                )
        })

       })
       .then(negociacoesDeHoje => {
             for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
             }
             this.negociacoesView.update(this.negociacoes);
       });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação add com sucesso');
    }

}
