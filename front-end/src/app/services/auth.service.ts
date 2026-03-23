import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";



@Injectable({
    providedIn: 'root'
})

export class AuthService {

    usuarioLogado = signal<boolean>(false);
    
    private api = environment.auth

    private http = inject(HttpClient);
    private router = inject(Router);

    async login(usuario: string, senha: string) {
        const res: any = await firstValueFrom(
            this.http.post(`${this.api}`, {usuario, senha})
        )

        localStorage.setItem('token', res.token);

        this.usuarioLogado.set(true);
        this.router.navigate(['/pessoa-list'])
    }

    logout() {
        localStorage.removeItem('token');
        this.usuarioLogado.set(false);
        this.router.navigate(['/login'])
    }
}
