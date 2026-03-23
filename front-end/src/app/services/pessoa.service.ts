import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Pessoa } from "../models/pessoa";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class PessoaService {
 
    pessoas = signal<any[]>([]);

    constructor(private http: HttpClient) {}

    private api = environment.apiUrl

    async listar(): Promise<Pessoa[]> {
        return firstValueFrom(
            this.http.get<Pessoa[]>(this.api)
        );
        // this.pessoas.set(dados)
    }

    async cadastrar(pessoa: any) {
        await firstValueFrom(
            this.http.post(`${this.api}`, pessoa)
        )
    }

    async editar(id: number, pessoa: any) {
        await firstValueFrom(
            this.http.put(`${this.api}/${id}`, pessoa)
        )
        
        //Atualiza a Lista, após editar
        this.pessoas.update(lista => 
            lista.map(p => 
                p.id === id ? pessoa : p
            )
        );

    }

    async excluir(id: number) {
        await firstValueFrom(
            this.http.delete(`${this.api}/${id}`)
        )
        //Atualiza a Lista, após excluir
        this.pessoas.update(lista => 
            lista.filter(p => 
                p.id !== id
            )
        );
    }

    async buscarPorId(id: number): Promise<Pessoa> {
        return await firstValueFrom(
            this.http.get<Pessoa>(`${this.api}/${id}`)
        );
    }
}