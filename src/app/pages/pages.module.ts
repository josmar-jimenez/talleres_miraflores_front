import { NgModule , CUSTOM_ELEMENTS_SCHEMA     } from '@angular/core';
import { CommonModule   } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { HomeComponent  } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorPagesComponent } from './error-pages/error-pages.component';  
import { ModalListComponent } from './generic/modal-list.component';
import { ActionPaginationListComponent } from './generic/action-pagination-list.component'; 
import { FormUserComponent } from './user/form-user/form-user.component';
import { StoreComponent } from './store/store.component';
import { FormStoreComponent } from './store/form-store/form-store.component';
import { ProductComponent } from './product/product.component';
import { FormProductComponent } from './product/form-product/form-product.component';
import { StockComponent } from './stock/stock.component';
import { FormStockComponent } from './stock/form-stock/form-stock.component';
import { ProviderComponent } from './provider/provider.component';
import { FormProviderComponent } from './provider/form-provider/form-provider.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormInventoryComponent } from './inventory/form-inventory/form-inventory.component';
import { SaleComponent } from './sale/sale.component';
import { FormSaleComponent } from './sale/form-sale/form-sale.component';
import { TagComponent } from './tag/tag.component';
import { FormTagComponent } from './tag/form-tag/form-tag.component';
import { LoadingComponent } from './generic/loading/loading.component'; 
import { ButtonListComponent } from './button-list/button-list.component'; 
import { IndexComponent } from './index/index.component';

const maskConfig: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    HomeComponent,  
    ActionPaginationListComponent,
    LoadingComponent,
    ModalListComponent,
    UserComponent,
    LoginComponent,  
    ErrorPagesComponent, 
    FormUserComponent, 
    StoreComponent, 
    FormStoreComponent,
    ProductComponent, 
    ButtonListComponent,
    IndexComponent,
    FormProductComponent, StockComponent, FormStockComponent, ProviderComponent, FormProviderComponent, 
    InventoryComponent, FormInventoryComponent, SaleComponent, FormSaleComponent, TagComponent, FormTagComponent
  ],
  imports: [CommonModule, NgxPaginationModule,HttpClientModule,RouterModule,ReactiveFormsModule, 
            FormsModule, NgxMaskModule.forRoot(maskConfig), TranslateModule.forChild()],
  exports:[ 
    HomeComponent,   
    ErrorPagesComponent,
    UserComponent, 
    LoadingComponent,
    LoginComponent,
    IndexComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
