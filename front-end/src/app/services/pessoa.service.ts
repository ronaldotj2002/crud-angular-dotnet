import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { Pessoa } from "../models/pessoa";


@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    private api = 'https://localhost:7184/api/pessoa';
    private api2 = "http://localhost:5117api/pessoa";
    pessoas = signal<any[]>([]);

    constructor(private http: HttpClient) {}

    async listar() {
        const dados = await firstValueFrom(
            this.http.get<any[]>(this.api)
        );
        this.pessoas.set(dados)
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