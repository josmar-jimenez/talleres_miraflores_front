import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'src/app/model/data/store';
import { CrudService } from './crud.service';
import { propierties_api as prop_api } from 'src/app/globals';

const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url,
  enpointURL: prop_api.empoint_url.endpoint_store
};

@Injectable({
  providedIn: 'root'
})
export class StoreService extends CrudService<Store, number>{ 
  
  constructor(private http: HttpClient) {
    super(http, endpoint.baseURL.concat(endpoint.enpointURL) );
   }  
}