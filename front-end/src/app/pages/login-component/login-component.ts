import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  form!: FormGroup;
  mensagemErroLogin = signal('');

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/pessoa-list']);
    }
  }
  async login() {

    this.mensagemErroLogin.set('');

    if (this.form.invalid) return;
    const { usuario, senha } = this.form.value;

    try {
      await this.auth.login(usuario, senha)
      this.router.navigate(['/pessoa-list'])
    } catch (err: any) {
      if (err.status === 401) {
        this.mensagemErroLogin.set('Usuário ou senha inválidos');
      } else {
        this.mensagemErroLogin.set('Erro ao realizar login');
      }
    }

  }

}
