import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { propierties_api as prop_api } from 'src/app/globals';  

import { CrudService } from './crud.service';  
import { Stock } from 'src/app/model/data/stock';
  
const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url,
  enpointURL: prop_api.empoint_url.endpoint_stock
};

@Injectable({
  providedIn: 'root'
})

export class StockService extends CrudService<Stock, number>{ 
  
  constructor(private http: HttpClient) {
    super(http, endpoint.baseURL.concat(endpoint.enpointURL) );
   }  
   
}
