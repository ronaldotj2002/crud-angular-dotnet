import { Routes } from '@angular/router';
import { ListarPessoasComponent } from './components/listar-pessoas/listar-pessoas.component';
import { CadastrarEditarPessoaComponent } from './components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { 
        path: 'login', 
        loadComponent: () =>
        import('./pages/login-component/login-component')
        .then(m => m.LoginComponent)
    },
    //ListarPessoasComponent
    { 
        path: 'pessoa-list', 
        canActivate: [authGuard],
        loadComponent: () =>
        import('./components/listar-pessoas/listar-pessoas.component')
        .then(m => m.ListarPessoasComponent)
    },
    { 
        path: 'pessoa-form', 
        canActivate: [authGuard],
        loadComponent: () =>
        import('./components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component')
        .then(m => m.CadastrarEditarPessoaComponent)
    },
    { 
        path: 'pessoa-form/:id', 
        canActivate: [authGuard],
        loadComponent: () =>
        import('./components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component')
        .then(m => m.CadastrarEditarPessoaComponent)
    },
    
   

];
