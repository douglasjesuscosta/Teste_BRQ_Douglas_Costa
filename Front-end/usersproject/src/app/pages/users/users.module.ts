import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'

import { UserRoutes } from './users.router'
import { UsuarioResolve } from './user.resolve'
import { UsuariosResolve } from './users.resolve'
import { UsuarioClientService } from './users-client.service'
import { UserFormComponent } from './user-form/user-form.component'
import { ListUsersComponent } from './list-users/list-users.component'

@NgModule({
    declarations: [ListUsersComponent, UserFormComponent],
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(UserRoutes), NgbModule],
    providers: [UsuarioResolve, UsuariosResolve, UsuarioClientService],
})
export class UsersModule {}
