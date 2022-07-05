import { NegociacaoesDoDia } from "../interfaces/negociacao-do-dia.js"
import { Negociacao } from "../models/negociacao.js"

export class NegociacoesService {
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            //convert para json
            .then(res => res.json())
            .then((dados: NegociacaoesDoDia[]) => {
                return dados.map(dadoDeHoje => {
                    return new Negociacao(
                        new Date(),
                        dadoDeHoje.vezes,
                        dadoDeHoje.montante
                    )
                })
            });
    }
}