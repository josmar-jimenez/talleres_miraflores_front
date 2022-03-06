import { Component, OnInit } from '@angular/core';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { Product } from 'src/app/model/data/product';
import { ProductFound } from 'src/app/model/data/product-found';
import { ProductService } from 'src/app/services/data/product.service';
import { StoreService } from 'src/app/services/data/store.service';
import { StorageService } from 'src/app/services/upload-file/storage.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public isMobile: boolean = false;  

  /*Product List */
  public productsList: Array<string> = [];
  public info_component: any = prop_glo.info_globals.info_component;
  public productList: Array<Product> = [];
  public productFoundList: Array<ProductFound> = [];
  public findProducts : boolean = false;
  public inputFinder : any;
  public paginator:any = prop_glo.info_globals.info_component.list.pagination;
  public maskPhone: string = prop_glo.mask.mask_phone;      

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    public storageService: StorageService,
    private deviceService: DeviceDetectorService
  ) {

   }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  goToFinder($element: any): void {
    this.productFoundList = [];
    this.inputFinder = "";
    this.findProducts =false;
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  goToFounds($elementTarget: any): void {
    this.findProducts =true;
    this.findProductWithStock(this.inputFinder,$elementTarget);
    $elementTarget.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  goToFoundsWithEnter($element: any,$elementTarget: any): void {
    this.findProducts =true;
    this.findProductWithStock($element.target.value,$elementTarget);
    $elementTarget.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  findProductWithStock(inputToFind: any, $elementTarget:any): void {
    this.productService.findByInput(inputToFind).subscribe((data: any) => {
      this.productList = data.info;
      this.productFoundList = [];
      this.productList.forEach((element,index) => {
        this.productFoundList.push(new ProductFound(element));
        this.findStoreByProduct(element.id,index);
        this.getImage(element.id, index);
      });
      this.paginator.num_page =0;
      $elementTarget.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, (error: any) => {
      this.productFoundList = [];
      window.sessionStorage.clear();
      console.log(error);
    });
  }

  changeFinderInput($element: any): void {
    let inputToFind = $element.target.value;
    if (inputToFind.length < 3){
      this.findProducts =false;
      return;
    }
    this.productService.findByInput(inputToFind).subscribe((data: any) => {
      this.productList = data.info;
      this.productFoundList = [];
      this.productList.forEach((element) => {
        this.productFoundList.push(new ProductFound(element));
      });
      this.paginator.num_page =0;
    }, (error: any) => {
      this.productFoundList = [];
      console.log(error);
    });
  }

  findStoreByProduct(productId: any, index:number): void {
    this.storeService.findByProduct(productId).subscribe((data: any) => {
      this.productFoundList[index].stores = data.info;
    }, (error: any) => {
      console.log(error);
      window.sessionStorage.clear();
    });
  }

  getImage(idProduct:any, index:number) {
     this.storageService.getDownloadURL("product/"+idProduct+"/image.jpg").then(value => {
        this.productFoundList[index].image=value;
      } ).catch(function(reason) {
        console.log(reason);
     });
  }
}
