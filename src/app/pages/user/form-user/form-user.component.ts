import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

import { ValidationConfimPass } from 'src/app/pages/validation';
import { User } from 'src/app/model/data/user';
import { Status } from 'src/app/services/data/status-const';
import { UsersService } from 'src/app/services/data/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { propiedades_globales as prop_glo } from 'src/app/globals';
import { StoreService } from 'src/app/services/data/store.service';
import { Profile } from 'src/app/services/data/profile-const';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private storeService: StoreService,
    private serviceUse: UsersService,
    private location: Location,
    private notificationService:NotificationsService,
    public translate: TranslateService
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
  }

  public label_text: any = prop_glo.label_component;
  public label_error: any = prop_glo.sms_error_component;
  public label_btn: any = prop_glo.label_btn;
  public maskPhone: string = prop_glo.mask.mask_phone;
  public status_activo: any = Status.estados[0];

  public submitted: boolean = false;
  public progressing: boolean = false;
  
  public isCreateMode: boolean = false;
  public isViewMode: boolean = false;
  public isDeleteMode: boolean = false;
  public isUserAdmin: boolean = false;

  public form!: FormGroup;
  public profile_system: any;
  public listStore: any;
  public id!: any;
  public info_component!: any;
  public form_data: any;
  public userStoreId: number = 0;

  ngOnInit(): void { 
    this.getInfoComponent();
    this.isUserAdmin = this.authService.getRoleId() == "1";
    this.userStoreId = Number(this.authService.getStoreId());
    this.form = this.formBuilder.group(
      {
        name: [{ value: "", disabled: this.isViewMode }, Validators.required],
        email: [{ value: "", disabled: this.isViewMode }, [Validators.required, Validators.email]],
        cellphone: [{ value: "", disabled: this.isViewMode }, [Validators.required]],
        address: [{ value: "", disabled: this.isViewMode }, [Validators.required]],
        storeId: [{value: this.userStoreId, disabled: (this.isViewMode || !this.isUserAdmin)}, [Validators.required]],
        roleId: [{ value: '', disabled: this.isViewMode }, [Validators.required]],
        nick: [{ value: "", disabled: this.isViewMode }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        emergencyPhone: [{ value: "", disabled: this.isViewMode }, [Validators.minLength(4), Validators.nullValidator]],
        emergencyContact: [{ value: "", disabled: this.isViewMode }, [Validators.minLength(4), Validators.maxLength(100)]],
        statusId: [{ value: 1, disabled: this.isViewMode }, Validators.required],
        password: [{ value: "", disabled: this.isViewMode }, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: [{ value: "", disabled: this.isViewMode }, Validators.required]
      }, { validators: [ValidationConfimPass.match('password', 'confirmPassword')] }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true; 

    if (this.form.invalid) {
      return;
    }

    this.controlLoading (true);

    this.form_data = this.form.value;
    let user_data = new User(null, this.form_data.storeId!=null?this.form_data.storeId:this.userStoreId, this.form_data.statusId, "",
      this.form_data.roleId,
      this.form_data.password, this.form_data.nick, this.form_data.name, this.form_data.cellphone,
      this.form_data.address, this.form_data.email, this.form_data.emergencyPhone,
      this.form_data.emergencyContact);

    if (!this.isCreateMode) {
      this.updateUser(user_data);
    } else {
      this.saveUser(user_data);
    }

  }

  saveUser(user_data: User): void {
    this.serviceUse.save(user_data).subscribe(
      (response: any) => {
        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;
        } else {
          sms = this.translate.instant('user').concat(" ").concat(prop_glo.sms_component.sms_success_add);
          pref = prop_glo.sms_component.pref_exito; 
        }

        this.postExecuteNotification(existeError, sms, pref);
      }, error => { console.log(error); }
    );
  }

  updateUser(user_data: User): void {
    this.serviceUse.update(this.id, user_data).subscribe(
      (response: any) => {
        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;
        } else {
          sms = this.translate.instant('user').concat(" ").concat(prop_glo.sms_component.sms_success_edit);
          pref = prop_glo.sms_component.pref_exito; 
        }

        this.postExecuteNotification(existeError, sms, pref);

      },
      error => {   console.log(error); });
  }


  onDelete() {
    this.serviceUse.delete(this.id).subscribe(
      (response: any) => {
        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;
        } else {
          sms = this.translate.instant('user').concat(" ").concat(prop_glo.sms_component.sms_success_edit);
          pref = prop_glo.sms_component.pref_exito;
        }

        this.postExecuteNotification(existeError, sms, pref);
      }, error => { console.log(error); }
    );

  }

  getIdParams(): Number {
    let id_param: Number = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id_param = Number(params.get('id') || null);
    });
    return id_param;
  }

  findItemById(id: any): void {
    this.serviceUse.findOne(id).pipe(first()).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        let existeError = response.error != null && response.error != '';

        if (existeError) {
          console.log(response.error);
        } else {
          console.log(response.info);
          this.form.patchValue(response.info);
          this.controlLoading (false); 
        }
      }, error => { console.log(error); }
      );
  }

  getInfoComponent(): void {
    this.getSelectedAddUser();
    let ruta = this.router.url;
    let owner = ruta.split('/')[1];
    this.info_component = this.serviceUse.getInfoComponent(ruta, owner);
    let actions = prop_glo.info_globals.acciones_component.all_action;

    this.isViewMode = this.info_component.accion_activa == actions[2];//actions[2] = view ~
    this.isCreateMode = this.info_component.accion_activa == actions[3]; //actions[3] = create ~
    this.isDeleteMode = this.info_component.accion_activa == actions[1]; //actions[1] = delete ~

    if (!this.isCreateMode) { 
      this.controlLoading (true); 
      this.id = this.getIdParams();
      console.log("ITEM [" + owner + "] | ID SELECCIONADO:" + this.id);
      this.findItemById(this.id);
    }
  }

  getSelectedAddUser(): void {
    this.profile_system = Profile.perfiles;
    this.storeService.findAllOptions().subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.listStore = data.info.content;
    }, error => {
      console.log(error);
    });
  }

  postExecuteNotification(_existeError: boolean, sms: string, pref: string) {
    if (_existeError) { 
      this.controlLoading (false); 
      this.toastr.error(sms, pref, {
        timeOut: 2000, positionClass: 'toast-top-center'
      });
      
    } else {
      this.notificationService.useCache = false;
      
      this.toastr.success(sms, pref, {
        timeOut: 3000, positionClass: 'toast-top-center'
      }).onHidden.subscribe( () => { this.onReset();  this.goUpdatedList();} );
    } 
    
  }
  /* Metodo utilitario */
  onReset(): void {
    this.submitted = false;  
    this.form.reset();
  }

  /* Metodos de navegacion */
  reloadCurrentPage() {
    window.location.reload();
  }

  goUpdatedList() {
    this.router.navigate([this.info_component.owner]);
  }

  goBack(): void {
    this.location.back();
  }

  controlLoading (status : boolean) : void {
    this.notificationService.setVisualizeLoading(status); //notificamos si necesitamos o no mostrar el loading
    this.progressing = status; //esta variable es usada para indicar que se procesa alguna peticion.
  }

}
