import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { User } from 'src/app/model/User'
import { environment } from 'src/environments/environment'

/**
 * Class that represents the integration with User client.
 */
@Injectable({
    providedIn: 'root',
})
export class UsuarioClientService {
    private endpointName: String = 'User'

    /**
     * Class Builder.
     *
     * @param http
     */
    constructor(private http: HttpClient) {}

    /**
     * Sends a request to insert a user.
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
     * Sends a request to update a User instance.
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
     * Returns a list  of users;
     */
    public getUsuarios(): Observable<any> {
        return this.http.get(`${environment.urlGatewayService}/${this.endpointName}/`)
    }

    /**
     * Returns a user based on a given id.
     */
    public getUsuario(id: string): Observable<any> {
        return this.http.get(`${environment.urlGatewayService}/${this.endpointName}/${id}`)
    }

    /**
     *  Sends a request to delete an user.
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
