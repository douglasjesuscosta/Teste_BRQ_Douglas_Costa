import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { PagesRoutingModule } from './pages.routing.module';

@NgModule({
    declarations: [HomepageComponent],
    imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
