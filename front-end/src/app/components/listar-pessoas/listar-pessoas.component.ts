import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PaginacaoComponent } from '../../shared/paginacao/paginacao.component';

@Component({
  selector: 'app-listar-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacaoComponent],
  templateUrl: './listar-pessoas.component.html',
  styleUrl: './listar-pessoas.component.css',
})
export class ListarPessoasComponent implements OnInit {

  
  private pessoaervice = inject(PessoaService);
  private router = inject(Router)

  paginaAtual = signal(1);
  itensPorPagina = 5;
  // pessoas = signal<Pessoa[]>([]);

  // get totalDePaginas(): number {
  //   return Math.ceil(this.pessoas.length / this.itensPorPagina)
  // }

  termoDeBusca = signal('');

  buscar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.termoDeBusca.set(input.value.toLocaleLowerCase());
  }

  filtro = computed(() => {
    const termo = this.termoDeBusca();

    if(!termo) return this.pessoas();

    return this.pessoas().filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.cidade.toLowerCase().includes(termo)
    );
  })

  totalDePaginas = computed(() =>
    Math.ceil(this.pessoas().length / this.itensPorPagina)
  )

  // get pessoasPaginadas(): Pessoa[] {
  //   const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
  //   const fim = inicio + this.itensPorPagina

  //   return this.pessoas().slice(inicio, fim);
  // }
  pessoasPaginadas = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina

    return this.filtro().slice(inicio, fim)
  })

  pessoas = this.pessoaervice.pessoas;

  ngOnInit(): void {
    this.pessoaervice.listar();
  }
  
  excluir(id: number) {    
      this.pessoaervice.excluir(id);   

  }

  editar(id: number, pessoa: Pessoa) {    
      this.pessoaervice.editar(id, pessoa);   
    this.router.navigate([`/pessoa-form/${id}`]);
  }

  cadastrar() {
    this.router.navigate([`/pessoa-form/`]);
  }


}
