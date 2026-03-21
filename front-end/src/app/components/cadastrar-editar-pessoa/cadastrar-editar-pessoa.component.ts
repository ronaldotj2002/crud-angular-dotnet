import { Component, inject, OnInit } from '@angular/core';
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
console.log("ID_PARAM", idParam);
      if(idParam) {
        this.id = Number(idParam);
        

        const pessoa = await this.pessoaService.buscarPorId(this.id)
       console.log("ID_PARAM - pessoa", pessoa);
        // const pessoa = this.pessoaService.pessoas().find(p => p.id === this.id);
        this.form.patchValue(pessoa)
        
      }
    }

  async salvar() {
console.log("SALVAR .........")
    // if (this.form.invalid) return;
// console.log(this.form);
    const formValue = this.form.getRawValue();

    
    if(this.id) {

      const dados = {
        id:this.id,
        ...formValue
      }

      await this.pessoaService.editar(
        this.id,
        dados
      );
      
    } else {
      this.pessoaService.cadastrar(
        formValue
      )
      console.log("DADOS", formValue)
    }
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
