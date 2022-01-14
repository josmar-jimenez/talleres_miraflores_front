import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';  
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common'; 
import { ComponetsModule } from './componets/componets.module';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloaderComponent } from './componets/preloader/preloader.component';
import { AuthInterceptorProviders } from './helpers/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const AppBaseHref = [
  {provide: APP_BASE_HREF, useValue: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent
  ],
  imports: [  
    BrowserModule,  
    HttpClientModule,
    ComponetsModule,
    PagesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  exports: [
  ],
  providers: [ 
  AppBaseHref,   
  AuthInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}