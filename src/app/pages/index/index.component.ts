import { Component, OnInit } from '@angular/core';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { Product } from 'src/app/model/data/product';
import { ProductFound } from 'src/app/model/data/product-found';
import { ProductService } from 'src/app/services/data/product.service';
import { StoreService } from 'src/app/services/data/store.service';

@Component({
  selector: 'app-index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public NO_IMAGE = prop_glo.info_globals.info_component.no_image;
  public productsList: Array<string> = [];
  public info_component: any = prop_glo.info_globals.info_component;
  public productList: Array<Product> = [];
  public productFoundList: Array<ProductFound> = [];

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
  }

  goToFounds($element: any): void {
    this.productsList.push("test");
    this.productFoundList.forEach((element, index) => {
      this.findStoreByProduct(element.id,index);
    });
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  changeFinderInput($element: any): void {
    let inputToFind = $element.target.value;
    if (inputToFind.length < 3)
      return;
    this.productService.findByInput(inputToFind).subscribe((data: any) => {
      this.productList = data.info;
      this.productFoundList = [];
      this.productList.forEach((element) => {
        this.productFoundList.push(new ProductFound(element));
      });
    }, (error: any) => {
      console.log(error);
    });
  }

  findStoreByProduct(productId: any, index:number): void {
    this.storeService.findByProduct(productId).subscribe((data: any) => {
      console.log(data)
      this.productFoundList[index].stores = data.info;
    }, (error: any) => {
      console.log(error);
    });
  }

  /*   getSelectedProducts(): void {
      this.stockService.findAllOptions().subscribe((data: any) => {
        this.authService.setToken(data.token);
        this.listStock = data.info.content;
        this.listStock.forEach(item => {
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
  
    } */
}
