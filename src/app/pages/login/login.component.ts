import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Login } from '../../model/login'; 
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit { 

  public isLoggedIn = false;
  public isLoginFail = false;
  public submitted = false; 
  public lang_browser:any;

  public goblas_prop: any  = prop_glo;  
  public logo_login:any; 

  public form_data: any = {
    usuarioLogin: null,
    claveLogin: null
  };

  public formLogin!: FormGroup;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) { 
   this.setLanguage();
  }

  setLanguage(){
    this.lang_browser = this.translate.getBrowserLang();
    this.translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
    this.translate.use( this.lang_browser );
  }

  ngOnInit(): void {
    this.deleteSesion();
    this.isLoggedIn = false;
    this.isLoginFail = false;
    this.addClassBody('hold-transition login-page');
    this.logo_login =  prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.url_logo_owner);
    this.formLogin = this.formBuilder.group(
      {
        usuarioLogin: ["", Validators.required],
        claveLogin: ["", Validators.required]
      });
  }

  onLogin(): void {
    if (this.formLogin.invalid) {
      return;
    }  
    let  errorMessage: string =  prop_glo.sms_error_component.msg_error_user_login;  
    this.form_data = this.formLogin.value;  

    this.loginService.login(new Login( this.form_data.usuarioLogin ,  this.form_data.claveLogin)).subscribe(
      (data:any)  => {
        this.authService.setToken(data.token);
        this.isLoginFail = false;
        this.submitted = true;

        this.deleteClassBody('hold-transition login-page');
        this.addClassBody('invisible-body.login');

        this.router.navigateByUrl('/home').then(() => {
          this.loginService.getAuthorizations().subscribe(
            (response: any) => {
              this.authService.setUserName(data.userName);
              this.authService.setAutorization(btoa(JSON.stringify(response.info)));
              this.authService.setToken(response.token); 
              this.authService.reloadPage();
            });
        });
      },(err:any) => {
        this.isLoginFail = true; 
        this.submitted = true;
        this.toastr.error(errorMessage, prop_glo.sms_error_component.pref_error, {
          timeOut: 4000, positionClass: 'toast-top-center',
        });

      }
    );

  }

  addClassBody(misClases: string): void {
    misClases.split(' ').forEach((className: string) => {
      this.renderer.addClass(document.body, className);
    });
  }

  deleteClassBody(misClases: string): void {
    misClases.split(' ').forEach((className: string) => {
      this.renderer.removeClass(document.body, className);
    });
  }

  deleteSesion() {
    window.sessionStorage.clear();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }
}
