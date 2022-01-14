import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/data/user'; 
import { propierties_api as prop_api } from 'src/app/globals';  

import { CrudService } from './crud.service';  
import { Inventory } from 'src/app/model/data/inventory';
  
const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url,
  enpointURL: prop_api.empoint_url.endpoint_inventory
};

@Injectable({
  providedIn: 'root'
})

export class InventoryService extends CrudService<Inventory, number>{ 
  
  constructor(private http: HttpClient) {
    super(http, endpoint.baseURL.concat(endpoint.enpointURL) );
   }  
   
}
