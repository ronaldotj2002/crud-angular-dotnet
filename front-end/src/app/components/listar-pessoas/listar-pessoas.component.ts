import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PaginacaoComponent } from '../../shared/paginacao/paginacao.component';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';

@Component({
  selector: 'app-listar-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacaoComponent, CpfPipe],
  templateUrl: './listar-pessoas.component.html',
  styleUrl: './listar-pessoas.component.css',
})
export class ListarPessoasComponent implements OnInit {

  
  private pessoaervice = inject(PessoaService);
  private router = inject(Router)

  loading = signal(false);
  paginaAtual = signal(1);
  itensPorPagina = 5;
  id!: number;

  termoDeBusca = signal('');
  modalConfirmacao = signal(false);
  toatsSucesso = signal(false);

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

  pessoasPaginadas = computed(() => {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina

    return this.filtro().slice(inicio, fim)
  })

  pessoas = this.pessoaervice.pessoas;

  ngOnInit(): void {
    this.carregarDados();
  }

  async carregarDados() {
    this.loading.set(true);

    try {
      const dados = await this.pessoaervice.listar();
      this.pessoas.set(dados);
    } finally {
      this.loading.set(false)
    }
  }

  openModal(id: number) {
      this.modalConfirmacao.set(true);
      this.id = id
    }
  
  excluir() {    
    this.modalConfirmacao.set(false);
    this.pessoaervice.excluir(this.id);   
    this.confirmado();
  }

  confirmado() {
  this.toatsSucesso.set(true);
    setTimeout(() => {
      this.toatsSucesso.set(false);
    }, 5000);
  }

  editar(id: number, pessoa: Pessoa) {    
      this.pessoaervice.editar(id, pessoa);   
    this.router.navigate([`/pessoa-form/${id}`]);
  }

  cadastrar() {
    this.router.navigate([`/pessoa-form/`]);
  }


}
