import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { User } from 'src/app/model/User'
import { environment } from 'src/environments/environment'

/**
 * Classe de integração com o serviço de Usuario.
 */
@Injectable({
    providedIn: 'root',
})
export class UsuarioClientService {
    private endpointName: String = 'User'

    /**
     * Construtor da classe.
     *
     * @param http
     */
    constructor(private http: HttpClient) {}

    /**
     * Salva a instância de Usuario.
     *
     * @param user
     * @return
     */
    public save(user: User): Observable<any> {
        let result: Observable<any> = null
        console.log(JSON.stringify(user))
        result = this.http.post(`${environment.urlGatewayService}/${this.endpointName}`, user)

        return result
    }

    /**
     * Atualiza a instância de Usuario.
     *
     * @param user
     * @return
     */
    public update(user: User): Observable<any> {
        let result: Observable<any> = null
        console.log(JSON.stringify(user))
        result = this.http.put(`${environment.urlGatewayService}/${this.endpointName}`, user)

        return result
    }

    /**
     * Retorna o array de Usuarios.
     */
    public getUsuarios(): Observable<any> {
        return this.http.get(`${environment.urlGatewayService}/${this.endpointName}/`)
    }

    /**
     * Retorna o Usuario a partir do ID.
     */
    public getUsuario(id: string): Observable<any> {
        return this.http.get(`${environment.urlGatewayService}/${this.endpointName}/${id}`)
    }

    /**
     * Exclui a instância de Usuario.
     *
     * @param user
     * @return
     */
    public delete(user): Observable<any> {
        let result: Observable<any> = null
        console.log(JSON.stringify(user))
        result = this.http.delete(`${environment.urlGatewayService}/${this.endpointName}/${user.id}`)

        return result
    }
}
