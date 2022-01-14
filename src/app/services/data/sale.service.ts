import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { propierties_api as prop_api } from 'src/app/globals';  

import { CrudService } from './crud.service';  
import { Sale } from 'src/app/model/data/sale';
  
const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url,
  enpointURL: prop_api.empoint_url.endpoint_sale
};

@Injectable({
  providedIn: 'root'
})

export class SaleService extends CrudService<Sale, number>{ 
  
  constructor(private http: HttpClient) {
    super(http, endpoint.baseURL.concat(endpoint.enpointURL) );
   }  
   
}