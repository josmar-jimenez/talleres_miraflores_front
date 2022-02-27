import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { StockService } from 'src/app/services/data/stock.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public progressing: boolean = false;
  public use_cache: boolean = true;
  public maskPhone: string = prop_glo.mask.mask_phone;
  public isUserAdmin: boolean = false;
  public actionAllowed: any = [];

  //Filtros
  public productList: Array<{ id: number, name: string }> = [];
  public storeList: Array<{ id: number, name: string }> = [];
  public productSelected: any = null;
  public storeSelected: any = null;
  public sort: any = null;

  public label_btn: any = prop_glo.label_btn;
  public label_text: any = prop_glo.label_component;
  public info_component: any = prop_glo.info_globals.info_component;

  constructor(
    private router: Router,
    private authService: AuthService,
    private serviceUse: StockService,
    private location: Location,
    private notificationService: NotificationsService,
  ) {
    this.isUserAdmin = this.authService.getRoleId() == "1";
  }

  ngOnInit(): void {
    this.getAllStocks(0);
    var userOperative = this.authService.loadModuleMenu(this.router.url);
    this.actionAllowed = userOperative != null && userOperative.length > 0 ? userOperative[0].action_name : null;
  }

  changePage () : void {
    this.getAllStocks(this.info_component.list.pagination.num_page-1);
  }

  getAllStocks(page:number): void {
    this.controlLoading(true);
    this.serviceUse.findAllSortedPageableAndFiltered(this.sort,
      page,this.info_component.size_page,{storeName: this.storeSelected, 
        productName:this.productSelected}).subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.getInfoComponent(data);  
    }, error => {
      console.log(error);
    });
  }

  getInfoComponent(data: any): void {
    this.restInfoComponent();
    let ruta = this.router.url;
    let owner = ruta.split('/')[1];
    this.info_component = this.serviceUse.getInfoComponent(ruta, owner);
    this.info_component.count_item = data.info.totalElements; 
    this.info_component.pageSize = data.info.pageable.pageSize;
    this.info_component.empty = data.info.empty;
    
    if (data.info.empty) {
      this.info_component.sms_empty = this.label_text.list_empty;
    } else {
      this.info_component.list.data = data.info.content;
      this.productList = [];
      this.storeList = [];
      
    }

    this.controlLoading(false);
  }

  restInfoComponent(): void {
    this.use_cache = true;
    this.info_component.title = '';
    this.info_component.list.data = '';
    this.info_component.list.acciones_crud = [];
  }

  goBack(): void {
    this.location.back();
  }

  controlLoading(status: boolean): void {
    this.notificationService.setVisualizeLoading(status); //notificamos si necesitamos o no mostrar el loading
    this.progressing = status; //esta variable es usada para indicar que se procesa alguna peticion.
  }

  /*Filtros y orden */
  filter(): void {
    this.controlLoading(true);
    this.restInfoComponent();    
    this.getAllStocks(0);
  }

  sortByKey(key: string): void {
    this.sort = {
      field: key,
      order: this.sort != null && this.sort.order != "ASC" ? "ASC" : "DESC"
    };
    this.getAllStocks(this.info_component.list.pagination.num_page);
  }
}
