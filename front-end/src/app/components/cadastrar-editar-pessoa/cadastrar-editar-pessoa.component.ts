import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CpfMaskDirective } from '../../shared/directives/cpf-mask.directive';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-cadastrar-editar-pessoa',
  standalone: true,
  imports: [ReactiveFormsModule, CpfMaskDirective],
  templateUrl: './cadastrar-editar-pessoa.component.html',
  styleUrl: './cadastrar-editar-pessoa.component.css',
})
export class CadastrarEditarPessoaComponent implements OnInit{

    private fb            = inject(FormBuilder);
    private pessoaService = inject(PessoaService);
    private route         = inject(ActivatedRoute);
    private router        = inject(Router);
    private auth          = inject(AuthService)

    id: number | null = null;
    msgErro: string = "";
    cpfInvalido: boolean = false;

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
    toatsErro= signal(false);
   
    form = this.fb.nonNullable.group({
      nome:        ['', Validators.required],
      idade:       [0, Validators.min(18)],
      estadoCivil: ['', Validators.required],
      cpf:         ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      cidade:      ['', Validators.required],
      estado:      ['', Validators.required]
    })
 

    async ngOnInit() {
      const idParam = this.route.snapshot.paramMap.get('id');

      if(idParam) {
        this.id = Number(idParam);
        
        const pessoa = await this.pessoaService.buscarPorId(this.id)
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
    const cpf = formValue.cpf.replace(/\D/g, "");
    formValue.cpf = cpf;

    
    if(this.id) {

      const dados = {
        id:this.id,
        ...formValue
      }

      await this.pessoaService.editar(this.id, dados);
      this.confirmado();
      
    } else {
      
      try {
        await this.pessoaService.cadastrar(formValue);
        this.confirmado();

      } catch (err: any) {

        if(err.status === 409) {
          this.ErroCadastro();
          this.msgErro = err.error;
          this.cpfInvalido = true;
          

        }

      } 
  }

}
confirmado() {
  
  this.toatsSucesso.set(true);
  
    setTimeout(() => {
      this.toatsSucesso.set(false);
    }, 5000);
    this.resetCampos();
  }

  ErroCadastro() {
    this.toatsErro.set(true);

    setTimeout(() => {
      this.toatsErro.set(false);
    }, 5000);
  }

  digito(e: any) {
    this.cpfInvalido = false;
  }
  
  resetCampos() {
    this.form.reset();
  }
  voltar() {
    this.router.navigate(['/']);
  }

  logout() {
    this.auth.logout();
  }
}
