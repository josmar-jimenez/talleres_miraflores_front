import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';  
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { propiedades_globales as prop_glo } from 'src/app/globals'; 
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { ProductService } from 'src/app/services/data/product.service';
import { StorageService } from 'src/app/services/upload-file/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit { 

  public progressing: boolean = false; 
  public use_cache: boolean = true;

  public label_btn: any = prop_glo.label_btn;
  public label_text: any = prop_glo.label_component;
  public info_component: any =  prop_glo.info_globals.info_component;
  private NO_IMAGE = prop_glo.info_globals.info_component.no_image ;

  public actionAllowed:any= [];
  public sort:any=null;

  public originalList: any;
  public productList: Array<{id:number,name:string}> = [];
  public productSelected:any=null;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private serviceUse: ProductService,
    private location: Location,
    private notificationService:NotificationsService,
    public translate: TranslateService,
    public storageService: StorageService
    ) {
      translate.addLangs(prop_glo.info_globals.idiomas.config);
      translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
    }
 
  ngOnInit(): void {  
    this.getAllProducts(); 
    var userOperative = this.authService.loadModuleMenu(this.router.url);
    this.actionAllowed = userOperative != null && userOperative.length > 0 ? userOperative[0].action_name : null;
  }
 
  getAllProducts(): void {
    this.controlLoading(true);
    this.restInfoComponent();    
    this.use_cache= this.notificationService.useCache == undefined;
    this.serviceUse.findAll(this.use_cache).subscribe((data: any) => {
      this.authService.setToken(data.token);
      this.getInfoComponent(data);  
    }, error => {
      console.log(error);
    });
  }
 
  getInfoComponent(data: any): void {
    let ruta = this.router.url;
    let owner = ruta.split('/')[1];    

    this.info_component = this.serviceUse.getInfoComponent(ruta, owner); 
    this.info_component.count_item = data.info.totalElements;    
    this.info_component.empty  = data.info.empty;

    if (data.info.empty) { 
      this.info_component.sms_empty  = this.label_text.list_empty;
    } else {
      this.info_component.list.data = data.info.content;
      data.info.content.forEach((element:any, index:any) => {
        this.getImage(element.id, index);
      });
      this.originalList = data.info.content;
      this.productList = [];
      this.originalList.forEach((stock:any) => {
        let exits = false;
        this.productList.forEach(product => {
          if(product.id==stock.id)
            exits=true;
        });
        if(!exits)
          this.productList.push({id:stock.id, name:stock.name});
      });
    }
 
    this.controlLoading(false);
  }

  getImage(idProduct:number, index:number) {
    this.info_component.list.data[index].image=this.NO_IMAGE;
     this.storageService.getDownloadURL("product/"+idProduct+"/image.jpg").then(value => {
        this.info_component.list.data[index].image=value;
      } ).catch(function(reason) {
        console.log(reason);
     });
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

  filter(): void {
    let temporalList:any = [];
    this.originalList.forEach((element:any) => {
      if(element.name==this.productSelected || this.productSelected==null) {
        temporalList.push(element);
      }
    });
    this.productSelected = null;
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

  controlLoading (status : boolean) : void {
    this.notificationService.setVisualizeLoading(status); //notificamos si necesitamos o no mostrar el loading
    this.progressing = status; //esta variable es usada para indicar que se procesa alguna peticion.
  }
}
