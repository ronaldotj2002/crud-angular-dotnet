import { Routes } from '@angular/router';
import { ListarPessoasComponent } from './components/listar-pessoas/listar-pessoas.component';
import { CadastrarEditarPessoaComponent } from './components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component';


export const routes: Routes = [
    { path: '', component: ListarPessoasComponent},
    { 
        path: 'pessoa-form', 
        loadComponent: () =>
        import('./components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component')
        .then(m => m.CadastrarEditarPessoaComponent)
    },
    { 
        path: 'pessoa-form/:id', 
        loadComponent: () =>
        import('./components/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component')
        .then(m => m.CadastrarEditarPessoaComponent)
    },
   

];
