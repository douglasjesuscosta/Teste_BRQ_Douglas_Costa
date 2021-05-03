import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { LayoutModule } from './layout/layout.module'
import { AppRoutingModule } from './app-routing.module'
import { UsuarioResolve } from './pages/users/user.resolve'

@NgModule({
    declarations: [AppComponent],
    imports: [LayoutModule, BrowserModule, AppRoutingModule],
    providers: [UsuarioResolve],
    bootstrap: [AppComponent],
})
export class AppModule {}
