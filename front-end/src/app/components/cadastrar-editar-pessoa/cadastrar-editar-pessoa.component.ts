import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar-editar-pessoa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-editar-pessoa.component.html',
  styleUrl: './cadastrar-editar-pessoa.component.css',
})
export class CadastrarEditarPessoaComponent implements OnInit{

    private fb = inject(FormBuilder);
    private pessoaService = inject(PessoaService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    id: number | null = null;

    estadosCivis = [
      'Solteiro(a)',
      'Casado(a)',
      'Divorciado(a)',
      'Viúvo(a)'
    ]

    estados = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES",
      "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR",
      "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
      "SP", "SE", "TO"
    ];

    modalConfirmacao = signal(false);
    toatsSucesso = signal(false);
   
    form = this.fb.nonNullable.group({
      nome: ['', Validators.required],
      idade: [0, Validators.required],
      estadoCivil: ['', Validators.required],
      cpf: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    })

    async ngOnInit() {
      const idParam = this.route.snapshot.paramMap.get('id');

      if(idParam) {
        this.id = Number(idParam);
        

        const pessoa = await this.pessoaService.buscarPorId(this.id)
       console.log("ID_PARAM - pessoa", pessoa);
        // const pessoa = this.pessoaService.pessoas().find(p => p.id === this.id);
        this.form.patchValue(pessoa)
        
      }
    }

    openModal() {
      this.modalConfirmacao.set(true);
    }

  async salvar() {

    this.modalConfirmacao.set(false);
    const formValue = this.form.getRawValue();
    
    if(this.id) {

      const dados = {
        id:this.id,
        ...formValue
      }

      await this.pessoaService.editar(this.id, dados);
      this.confirmado();
      
    } else {
      this.pessoaService.cadastrar(formValue);
      this.confirmado();
  }

}
confirmado() {
  this.toatsSucesso.set(true);
    setTimeout(() => {
      this.toatsSucesso.set(false);
    }, 5000);
    this.resetCampos();
  }

  resetCampos() {
    this.form.reset();
  }
  voltar() {
    this.router.navigate(['/']);
  }
}
