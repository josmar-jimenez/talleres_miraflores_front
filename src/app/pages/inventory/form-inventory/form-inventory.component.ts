import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

import { propiedades_globales as prop_glo } from 'src/app/globals';
import { Status } from 'src/app/services/data/status-const';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/data/store.service';
import { InventoryService } from 'src/app/services/data/inventory.service';
import { Inventory } from 'src/app/model/data/inventory';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { DetailInventory } from 'src/app/model/data/detail-inventory';
import { InventoryTable } from 'src/app/model/data/inventory-table';
import { StockService } from 'src/app/services/data/stock.service';
import { Stock } from 'src/app/model/data/stock';
import { StockByProduct } from 'src/app/model/data/stock-by-product';


@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
  styleUrls: ['./form-inventory.component.css']
})

export class FormInventoryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private serviceUse: InventoryService,
    private storeService: StoreService,
    private stockService: StockService,
    private location: Location,
    private notificationService: NotificationsService,
    public translate: TranslateService
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);

  }

  public submitted: boolean = false;
  public submitted2: boolean = false;
  public storeEmpty: boolean = false;

  public progressing: boolean = false;
  public isCreateMode: boolean = false;
  public isViewMode: boolean = false;
  public isDeleteMode: boolean = false;
  public isUserAdmin: boolean = false;

  public label_text: any = prop_glo.label_component;
  public label_error: any = prop_glo.sms_error_component;
  public label_btn: any = prop_glo.label_btn;
  public status_activo: any = Status.estados[0];

  public form!: FormGroup;
  public listStore: any;
  public listStock: Array<Stock> = [];
  public listProduct: Array<StockByProduct> = [];
  public id: any = null;
  public info_component!: any;
  public form_data: any;
  public userStoreId: number = 0;
  public inventoryTable: Array<InventoryTable> = [];

  ngOnInit(): void {
    this.isUserAdmin = this.authService.getRoleId() == "1";
    this.userStoreId = Number(this.authService.getStoreId());
    this.getInfoComponent();
    this.form = this.formBuilder.group(
      {
        storeId: [{ value: this.userStoreId, disabled: (this.isViewMode || !this.isUserAdmin) }, null],
        comments: [{ value: "", disabled: this.isViewMode }, null],
        statusId: [{ value: this.status_activo.id, disabled: this.isViewMode }, null],

        cantPhysical: [{ value: "", disabled: this.isViewMode }, Validators.required],
        productId: [{ value: '', disabled: this.isViewMode }, [Validators.required]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = false;
    this.submitted2 = true;
    this.form_data = this.form.value;
    if (this.form.invalid || this.inventoryTable.length == 0) {
      return;
    }

    this.controlLoading(true);

    let inventoryDetails: Array<DetailInventory> = [];
    this.inventoryTable.forEach(item => {
      inventoryDetails.push(new DetailInventory(item.productId, item.cant, 0))
    });

    let inventory_data = new Inventory(null, (this.form_data.storeId!=null?this.form_data.storeId:this.userStoreId), 
    this.form_data.comments, inventoryDetails, "", false);

    if (!this.isCreateMode) {
      //this.updateProduct(inventory_data);
      //Chequear un inventario no deberia poder actualizarse
    } else {
      this.saveProduct(inventory_data);
    }

  }

  saveProduct(inventory_data: Inventory) {
    this.serviceUse.save(inventory_data).subscribe(
      (response: any) => {

        let sms: string, pref: string;
        this.authService.setToken(response.token);
        let existeError: boolean = response.error != null && response.error != '';

        if (existeError) {
          sms = response.error;
          pref = prop_glo.sms_error_component.pref_error;
        } else {
          sms = this.translate.instant('inventory').concat(" ").concat(prop_glo.sms_component.sms_success_add);
          pref = prop_glo.sms_component.pref_exito;
        }
        this.postExecuteNotification(existeError, sms, pref);
      }, error => { console.log(error); }
    );
  }

  updateProduct(inventory_data: Inventory): void {
  }

  onDelete() {
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
        console.log(response);
        this.authService.setToken(response.token);
        let existeError = response.error != null && response.error != '';

        if (existeError) {
          console.log(response.error);
        } else {
          this.form.patchValue(response.info);
          this.controlLoading(false);
          response.info.detail.forEach((item: any) => {
              this.inventoryTable.push(new InventoryTable(item.productId, item.productName, item.cantPhysical));
          });
        }
      },
      error => {
        console.log(error);
      });
  }

  updateProductList(): void {
    this.form_data = this.form.value;
    this.inventoryTable = [];
    this.listProduct = [];
    this.listStock.forEach(item => {
      if (item.storeId == this.form_data.storeId)
        this.listProduct.push(new StockByProduct(item.productId, item.productName, item.stock,0));
    });
  }

  getSelectedAddStock(): void {
    this.stockService.findAllOptions().subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.listStock = data.info.content;
      this.listStock.forEach(item => {
          if(item.storeId==this.userStoreId)
            this.listProduct.push(new StockByProduct(item.productId, item.productName, item.stock,0));
      });
    }, (error: any) => {
      console.log(error);
    });

    this.storeService.findAllOptions().subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.listStore = data.info.content;
      this.controlLoading(false);
    }, (error: any) => {
      console.log(error);
    });

  }

  getInfoComponent() {
    this.controlLoading(true);
    this.getSelectedAddStock();

    let ruta = this.router.url;
    let owner = ruta.split('/')[1];
    this.info_component = this.serviceUse.getInfoComponent(ruta, owner);
    let actions = prop_glo.info_globals.acciones_component.all_action;

    this.isViewMode = this.info_component.accion_activa == actions[2];//actions[4] = view ~
    this.isCreateMode = this.info_component.accion_activa == actions[3]; //actions[4] = create ~
    this.isDeleteMode = this.info_component.accion_activa == actions[1]; //actions[1] = delete ~

    if (!this.isCreateMode) {  //actions[4] = create ~   
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
      }).onHidden.subscribe(() => { this.onReset(); this.goUpdatedList(); });
    }

  }
  /* Metodo utilitario */
  onReset(): void {
    this.submitted = false;
    this.submitted2 = false;
    this.storeEmpty = false;
    this.inventoryTable = [];
    this.form.reset({
      productId: ''
    });
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

  controlLoading(status: boolean): void {
    this.notificationService.setVisualizeLoading(status); //notificamos si necesitamos o no mostrar el loading
    this.progressing = status; //esta variable es usada para indicar que se procesa alguna peticion.
  }

  /*Acciones tabla*/
  addItem(): void {
    this.form_data = this.form.value;
    this.submitted = true;
    this.storeEmpty = false;
    if (this.form_data.storeId == '') {
      this.storeEmpty = true;
      this.submitted2 = true;
      return;
    } else {
      this.storeEmpty = false;
      this.submitted2 = false;
    }
    if (this.form.invalid) {
      return;
    }

    /*Check nombre del producto*/
    var productName: string = "";
    this.listProduct.forEach((item) => {
      if (item.productId == this.form_data.productId) {
        productName = item.productName;
      }
    });

    /*Check si producto existe*/
    this.inventoryTable.forEach((item, index) => {
      if (item.productId == this.form_data.productId)
        this.inventoryTable.splice(index, 1);
    });
    this.inventoryTable.push(new InventoryTable(this.form_data.productId, productName, this.form_data.cantPhysical));
  }

  addCant(id: number): void {
    this.inventoryTable.forEach((item) => {
      if (item.productId == id) {
        item.cant = item.cant + 1;
      }
    });
  }

  subsCant(id: number): void {
    this.inventoryTable.forEach((item, index) => {
      if (item.productId == id) {
        if (item.cant > 1)
          item.cant = item.cant - 1;
        else
          this.inventoryTable.splice(index, 1);
      }
    });

  }
  removeItem(id: number): void {
    this.inventoryTable.forEach((item, index) => {
      if (item.productId == id)
        this.inventoryTable.splice(index, 1);
    });
  }
}
