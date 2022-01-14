import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component'; 
import {  ErrorPagesComponent } from './pages/error-pages/error-pages.component';
import { AuthGuardService as AuthGuard  } from './services/auth/auth-guard.service';  
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreComponent } from './pages/store/store.component';
import { ProductComponent } from './pages/product/product.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SaleComponent } from './pages/sale/sale.component';
import { TagComponent } from './pages/tag/tag.component';
import { FormStoreComponent } from './pages/store/form-store/form-store.component';
import { FormProductComponent } from './pages/product/form-product/form-product.component';
import { FormStockComponent } from './pages/stock/form-stock/form-stock.component';
import { FormInventoryComponent } from './pages/inventory/form-inventory/form-inventory.component';
import { FormSaleComponent } from './pages/sale/form-sale/form-sale.component';
import { FormTagComponent } from './pages/tag/form-tag/form-tag.component';
import { FormProviderComponent } from './pages/provider/form-provider/form-provider.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [ 
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent,canActivate: [AuthGuard] }, 
  { path: 'user/create', component: FormUserComponent ,canActivate: [AuthGuard] },
  { path: 'user/view/:id', component: FormUserComponent ,canActivate: [AuthGuard] }, 
  { path: 'user/edit/:id', component: FormUserComponent ,canActivate: [AuthGuard] },
  { path: 'user/delete/:id', component: FormUserComponent ,canActivate: [AuthGuard] }, 

  { path: 'store', component: StoreComponent,canActivate: [AuthGuard] },  
  { path: 'store/create', component: FormStoreComponent ,canActivate: [AuthGuard] },
  { path: 'store/view/:id', component: FormStoreComponent ,canActivate: [AuthGuard] }, 
  { path: 'store/edit/:id', component: FormStoreComponent ,canActivate: [AuthGuard] },
  { path: 'store/delete/:id', component: FormStoreComponent ,canActivate: [AuthGuard] }, 

  { path: 'product', component: ProductComponent,canActivate: [AuthGuard] }, 
  { path: 'product/create', component: FormProductComponent ,canActivate: [AuthGuard] },
  { path: 'product/view/:id', component: FormProductComponent ,canActivate: [AuthGuard] }, 
  { path: 'product/edit/:id', component: FormProductComponent ,canActivate: [AuthGuard] },
  { path: 'product/delete/:id', component: FormProductComponent ,canActivate: [AuthGuard] }, 

  { path: 'stock', component: StockComponent,canActivate: [AuthGuard] }, 
  { path: 'stock/create', component: FormStockComponent ,canActivate: [AuthGuard] },
  { path: 'stock/view/:id', component: FormStockComponent ,canActivate: [AuthGuard] }, 
  { path: 'stock/edit/:id', component: FormStockComponent ,canActivate: [AuthGuard] },
  { path: 'stock/delete/:id', component: FormStockComponent ,canActivate: [AuthGuard] }, 

  { path: 'provider', component: ProviderComponent,canActivate: [AuthGuard] }, 
  { path: 'provider/create', component: FormProviderComponent ,canActivate: [AuthGuard] },
  { path: 'provider/view/:id', component: FormProviderComponent ,canActivate: [AuthGuard] }, 
  { path: 'provider/edit/:id', component: FormProviderComponent ,canActivate: [AuthGuard] },
  { path: 'provider/delete/:id', component: FormProviderComponent ,canActivate: [AuthGuard] }, 

  { path: 'inventory', component: InventoryComponent,canActivate: [AuthGuard] }, 
  { path: 'inventory/create', component: FormInventoryComponent ,canActivate: [AuthGuard] },
  { path: 'inventory/view/:id', component: FormInventoryComponent ,canActivate: [AuthGuard] }, 
  { path: 'inventory/edit/:id', component: FormInventoryComponent ,canActivate: [AuthGuard] },
  { path: 'inventory/delete/:id', component: FormInventoryComponent ,canActivate: [AuthGuard] }, 

  { path: 'sale', component: SaleComponent,canActivate: [AuthGuard] }, 
  { path: 'sale/create', component: FormSaleComponent ,canActivate: [AuthGuard] },
  { path: 'sale/view/:id', component: FormSaleComponent ,canActivate: [AuthGuard] }, 
  { path: 'sale/edit/:id', component: FormSaleComponent ,canActivate: [AuthGuard] },
  { path: 'sale/delete/:id', component: FormSaleComponent ,canActivate: [AuthGuard] }, 

  { path: 'tag', component: TagComponent,canActivate: [AuthGuard] }, 
  { path: 'tag/create', component: FormTagComponent ,canActivate: [AuthGuard] },
  { path: 'tag/view/:id', component: FormTagComponent ,canActivate: [AuthGuard] }, 
  { path: 'tag/edit/:id', component: FormTagComponent ,canActivate: [AuthGuard] },
  { path: 'tag/delete/:id', component: FormTagComponent ,canActivate: [AuthGuard] }, 

  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'errorPage', component:  ErrorPagesComponent },  
  { path: '', redirectTo: 'index', pathMatch: 'full'}, 
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', enableTracing: false})],
  providers: [AuthGuard],
  exports: [RouterModule,TranslateModule]
})

export class AppRoutingModule { } 