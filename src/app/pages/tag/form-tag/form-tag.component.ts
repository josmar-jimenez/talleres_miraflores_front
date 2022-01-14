import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

import { Status } from 'src/app/services/data/status-const';
import { AuthService } from 'src/app/services/auth/auth.service';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { Tag } from 'src/app/model/data/tag';
import { TagService } from 'src/app/services/data/tag.service';
import { ValidationSpaceWhite } from '../../validation';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.css']
})
export class FormTagComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private serviceUse: TagService,
    private location: Location,
    public translate: TranslateService, 
    public notificationService : NotificationsService
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
  }

  public label_text: any = prop_glo.label_component;
  public label_error: any = prop_glo.sms_error_component;
  public label_btn: any = prop_glo.label_btn;
  public status_activo: any = Status.estados[0];

  public form!: FormGroup;
  public submitted: boolean = false;
  public progressing: boolean = false;
  public isCreateMode: boolean = false;
  public isViewMode: boolean = false;
  public isDeleteMode: boolean = false;

  public id: any;
  public form_data: any;
  public info_component!: any;

  ngOnInit(): void {    
    this.form = this.formBuilder.group(
      {
        name: [{ value: "", disabled: this.isViewMode || this.isDeleteMode }, Validators.required]
      }, { validators: [ValidationSpaceWhite.cannotContainSpace('name')] }
    );

    this.getInfoComponent();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    this.controlLoading(true);

    this.form_data = this.form.value;
    let tag_data = new Tag(null, this.form_data.name);

    if (!this.isCreateMode) {
      this.updateTag(tag_data);
    } else {
      this.saveTag(tag_data);
    }

  }
  
  saveTag(tag_data: Tag): void {
    this.serviceUse.save(tag_data).subscribe(
      (response: any) => {
        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;
        } else {
          sms = this.info_component.owner.concat(' ').concat(prop_glo.sms_component.sms_success_add);
          pref = prop_glo.sms_component.pref_exito;
        }

        this.postExecuteNotification(existeError, sms, pref);
      }, error => { console.log(error); }
    );

  }

  updateTag(tag_data: Tag): void {
    this.serviceUse.update(this.id, tag_data).subscribe(
      (response: any) => {
        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;  
        } else {
          sms = this.info_component.owner.concat(' ').concat(prop_glo.sms_component.sms_success_edit);
          pref = prop_glo.sms_component.pref_exito;
        }

        this.postExecuteNotification(existeError, sms, pref);

      }, error => { console.log(error); }
    );
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
          sms = this.info_component.owner.concat(' ').concat(prop_glo.sms_component.sms_success_edit);
          pref = prop_glo.sms_component.pref_exito;
        }

        this.postExecuteNotification(existeError, sms, pref);
      }, error => { console.log(error); }
    );

  }

  getIdParams(): number {
    let id_param: number = 0;
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
          this.form.patchValue(response.info);
          this.controlLoading(false);
        }
      },
      error => {
        console.log(error);
      });
  }

  getInfoComponent() { 
    let ruta = this.router.url;
    let owner = ruta.split('/')[1];
    this.info_component = this.serviceUse.getInfoComponent(ruta, owner);
    let actions = prop_glo.info_globals.acciones_component.all_action;

    this.isViewMode = this.info_component.accion_activa == actions[2];//actions[4] = view ~
    this.isCreateMode = this.info_component.accion_activa == actions[3]; //actions[4] = create ~
    this.isDeleteMode = this.info_component.accion_activa == actions[1]; //actions[1] = delete ~

    if (!this.isCreateMode) {  //actions[4] = create ~ 
      this.controlLoading(true);
      this.id = this.getIdParams();
      console.log("ITEM [" + owner + "] | ID SELECCIONADO:" + this.id);
      this.findItemById(this.id);
    }


  }

  postExecuteNotification(_existeError: boolean, sms: string, pref: string) {
    if (_existeError) {
      this.controlLoading(false);  
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
