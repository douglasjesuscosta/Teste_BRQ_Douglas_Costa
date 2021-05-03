import { Routes } from '@angular/router'

import { UsuariosResolve } from './users.resolve'
import { UserFormComponent } from './user-form/user-form.component'
import { ListUsersComponent } from './list-users/list-users.component'
import { UsuarioResolve } from './user.resolve'

/**
 * Configuração de rotas de Pedido.
 */
export const UserRoutes: Routes = [
    {
        path: '',
        component: ListUsersComponent,
        resolve: {
            users: UsuariosResolve,
        },
    },
    {
        path: 'create',
        component: UserFormComponent,
        children: [
            {
                path: ':id',
                component: UserFormComponent,
                resolve: {
                    userUpdate: UsuarioResolve,
                },
            },
        ],
    },
]
