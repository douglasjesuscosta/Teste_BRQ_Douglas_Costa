import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router'

import { Observable } from 'rxjs'
import { UsuarioClientService } from './users-client.service'

/**
 * Classe resolve responsável pela busca das informações de Usuario
 * para carregamento da listagem de usuarios.
 *
 */
@Injectable()
export class UsuarioResolve implements Resolve<any> {
    /**
     * Construtor da classe.
     *
     * @param router
     * @param
     * @param messageService
     */
    constructor(private router: Router, private usuarioClientService: UsuarioClientService) {}

    /**
     * Realiza a consulta de Usuario.
     *
     * @param route
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let id = route.params['id']

        if (id && id != null) {
            return new Observable((observer) => {
                this.usuarioClientService.getUsuario(id).subscribe(
                    (data) => {
                        observer.next(data)
                        observer.complete()
                    },
                    (error) => {
                        observer.error(error)
                        this.router.navigate([''])
                    }
                )
            })
        }
    }
}
