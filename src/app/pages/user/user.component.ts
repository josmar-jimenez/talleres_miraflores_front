import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';  
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/data/users.service'; 
import { propiedades_globales as prop_glo } from 'src/app/globals'; 
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit { 

  public progressing: boolean = false;
  public use_cache: boolean = true;
  public isUserAdmin: boolean = false;
  public actionAllowed:any= [];

  public maskPhone: string = prop_glo.mask.mask_phone;      

  public label_btn: any = prop_glo.label_btn;
  public label_text: any = prop_glo.label_component;
  public info_component : any =  prop_glo.info_globals.info_component;
  
  //Filtros
  public storeSelected:any=null;
  public storeList: Array<{id:number,name:string}> = [];
  public originalList: any;
  public sort:any=null;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private serviceUse: UsersService,
    private location: Location,
    private notificationService:NotificationsService,
    ) {
      this.isUserAdmin = this.authService.getRoleId() == "1";
    }
 
  ngOnInit(): void {  
    this.getAllUsers();  
    var userOperative = this.authService.loadModuleMenu(this.router.url);
    this.actionAllowed = userOperative != null && userOperative.length > 0 ? userOperative[0].action_name : null;
  }
    
  getAllUsers(): void {
    this.controlLoading(true);

    this.restInfoComponent();    
    this.use_cache = this.notificationService.useCache != false; 
    this.serviceUse.findAll(this.use_cache).subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.getInfoComponent(data);  
    }, error => {
      console.log(error);
    }); 
  }
 
  getInfoComponent(data: any)  : void{ 
    let ruta = this.router.url;
    let owner = ruta.split('/')[1];    

    this.info_component = this.serviceUse.getInfoComponent(ruta, owner); 
    this.info_component.count_item = data.info.totalElements;    
    this.info_component.empty  = data.info.empty;

    if (data.info.empty) { 
      this.info_component.sms_empty  = this.label_text.list_empty;
    } else {
      this.info_component.list.data = data.info.content;
      this.originalList = data.info.content;
      this.storeList = [];
      this.originalList.forEach((stock:any) => {
        let exits = false;
      this.storeList.forEach(store => {
            if(store.id==stock.storeId)
              exits=true;
          });
          if(!exits)
            this.storeList.push({id:stock.storeId, name:stock.storeName});
      });
    } 

    this.controlLoading(false);
  }

  restInfoComponent()  : void{  
    this.use_cache = true;
    this.info_component.title = '';   
    this.info_component.list.data = '';
    this.info_component.list.acciones_crud = [];
  }

  goBack(): void {
    this.location.back();
  }
  
  controlLoading (status : boolean) : void {
    this.notificationService.setVisualizeLoading(status); //notificamos si necesitamos o no mostrar el loading
    this.progressing = status; //esta variable es usada para indicar que se procesa alguna peticion.
  }

  /*Ordenaiento y filtros*/
  filter(): void {
    let temporalList:any = [];
    this.originalList.forEach((element:any) => {
      if(element.storeName==this.storeSelected || this.storeSelected==null){
        temporalList.push(element);
      }
    });
    this.storeSelected=null;
    this.info_component.list.data = temporalList;
    this.info_component.list.pagination.num_page = 0
    this.info_component.count_item = temporalList.length;
  }

  sortByKey(key:string): void {
    this.sort = {
      field:key, 
      order:this.sort!=null&&this.sort.order!="ASC"?"ASC":"DESC"
    };
    this.serviceUse.findAllSorted(this.sort).subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.getInfoComponent(data);  
      this.info_component.list.pagination.num_page =0;
    }, error => {
      console.log(error);
    });
  }
}
