import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; 
import { Observable } from "rxjs"; 

import { Login } from '../../model/login';
import { JwtResponse } from '../../model/response/jwt-response';
import { User } from '../../model/data/user';
import { OperativesResponse } from 'src/app/model/response/operatives-response'; 
import { propierties_api as prop_api } from 'src/app/globals';
import { propiedades_globales as prop_glo } from 'src/app/globals';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*' }),
  params: {} 
};

const endpoint = {
  baseURL: prop_api.empoint_url.base_ws_url ,
  loginURL: prop_api.empoint_url.endpoint_login,  
  operativeURL: prop_api.empoint_url.endpoint_operatives,
  userURL:prop_api.empoint_url.endpoint_users
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient)  {  }  

  public login(loginUsuario: Login): Observable<JwtResponse> {   
    return this.http.post<JwtResponse>(endpoint.baseURL + endpoint.loginURL, loginUsuario, httpOptions);
  } 
  public getAuthorizations(): Observable<OperativesResponse>{ 
    return this.http.get<OperativesResponse>(endpoint.baseURL + endpoint.operativeURL);    
  }
   public nuevo(nuevoUsuario: User): Observable<any> {
    return this.http.post<any>(endpoint.baseURL + endpoint.userURL, nuevoUsuario, httpOptions);
  }

}
