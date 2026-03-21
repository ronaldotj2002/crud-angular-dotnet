import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  standalone: true,
  imports: [],
  templateUrl: './paginacao.component.html',
  styleUrl: './paginacao.component.css',
})
export class PaginacaoComponent {

  @Input() paginaAtual = 1;
  @Input() totalDePaginas = 1;

  @Output() mudarPagina = new EventEmitter<number>();

  get paginas(): number[] {
    return Array.from({ length: this.totalDePaginas }, (_, i) => i + 1);
  }

  irParaPagina(pagina: number) {
    this.mudarPagina.emit(pagina);
  }

  paginaAnterior() {
    if(this.paginaAtual > 1) {
      this.mudarPagina.emit(this.paginaAtual -1);
    }
  }

  proximaPagina() {
    if(this.paginaAtual < this.totalDePaginas) {
      this.mudarPagina.emit(this.paginaAtual + 1);
    }
  }

}
