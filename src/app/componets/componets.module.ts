import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { MainHeaderComponent } from './mainheader/mainheader.component';  
import { IndexHeaderComponent } from './indexheader/indexheader.component';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {  ErrorPagesComponent } from '../pages/error-pages/error-pages.component'; 
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [MainHeaderComponent,IndexHeaderComponent, SidebarComponent, FooterComponent,  NavbarComponent],
  imports: [ 
    CommonModule,RouterModule,FontAwesomeModule,TranslateModule.forChild()
  ], exports: [ 
    FontAwesomeModule, 
    MainHeaderComponent, 
    IndexHeaderComponent,
    NavbarComponent, 
    SidebarComponent, 
    FooterComponent
  ]
})


export class ComponetsModule { }
