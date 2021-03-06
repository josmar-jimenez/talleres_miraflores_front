import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { propierties_api as prop_api } from 'src/app/globals';  
import { CrudService } from './crud.service';  
import { Tag } from 'src/app/model/data/tag';
import { Observable} from 'rxjs';

const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url,
  enpointURL: prop_api.empoint_url.endpoint_tag
};

@Injectable({
  providedIn: 'root'
})

export class TagService extends CrudService<Tag, number>{ 
  
  constructor(private http: HttpClient) {
    super(http, endpoint.baseURL.concat(endpoint.enpointURL) );
   }  

  findAllTypes(): Observable<Tag[]> {    
      return this._http.get<Tag[]>(this._base+"/types");
  }
   
}
