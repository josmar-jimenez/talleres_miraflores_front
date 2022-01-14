import { Observable, of, throwError } from 'rxjs';
import { tap, share, finalize } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudOperations } from 'src/app/model/interfaces/crud-operations.interface';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { ActivatedRoute, ParamMap } from '@angular/router';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  private cache: any;
  private cachedObservable!: Observable<any>;
  private objempty: any = null;

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) { }

  save(_t: T): Observable<T> {
    return this._http.post<T>(this._base, _t);
  }

  update(_id: ID, _t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + _id, _t, {});
  }

  findOne(_id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + _id);
  }

  findAll(_use_cache:boolean): Observable<T[]> {    
    //use_cache is false : indica que se quiere persistir un nuevo registro y obtenemos los datos actualizados.
    if (_use_cache) {

      let observable: Observable<any>;

      if (this.cache) {
        observable = of(this.cache);
      } else if (this.cachedObservable) {
        observable = this.cachedObservable;
      } else {
        this.cachedObservable = this._http.get<T[]>(this._base).pipe(
          tap(res => this.cache = res),
          share(),
          finalize(() => { this.cachedObservable = this.objempty })
        );
        observable = this.cachedObservable;
      }
      return observable;

    }else{
      return this._http.get<T[]>(this._base);
    } 

  }
  findAllOptions(): Observable<T[]> { 
    return this._http.get<T[]>(this._base);
  }
  
  delete(_id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + _id);
  }

  // Handle API errors
  handleError(_error: HttpErrorResponse) {
    if (_error.error instanceof ErrorEvent) {
      console.error('An error occurred:', _error.error.message);
    } else {
      console.error(
        `Backend returned code ${_error.status}, ` +
        `body was: ${_error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  getTableHeaderName(_dataArray: any): Set<string> {
    let nameColum = new Set<string>();
    _dataArray.forEach((element: any) => {
      for (let key in element) {
        //NO SE AÑADEN A LA LISTA DE ITEM LOS ID
        if (key.lastIndexOf("Id") == -1 && key != "id") { nameColum.add(key); }
      }
    });
    return nameColum;
  }

  getInfoComponent(_ruta: string, _owner: string): any {
    const info_component = prop_glo.info_globals.info_component;
    //let symbol = /\//gi;

    let actions = prop_glo.info_globals.acciones_component.all_action;
    let all_url = prop_glo.info_globals.acciones_component.all_url;
    let is_list: boolean = true;

    all_url.forEach((url: string, index: any) => {

      let ruta_activada = "/".concat(_owner).concat(url);
      if (this.findExistence(_ruta, actions[index])) {
        info_component.owner = _owner;
        info_component.title = actions[index].concat(" ").concat(_owner);
        info_component.ruta_activada = ruta_activada;
        info_component.accion_activa = actions[index];
        is_list = false;
      }
      info_component.list.acciones_crud.push(ruta_activada);

    });

    if (is_list) {
      info_component.owner = _owner;
      info_component.ruta_activada = "/".concat(_owner);
      info_component.title = actions[4].concat(" ").concat(_owner);
      info_component.accion_activa = actions[4];
      info_component.list.url_add_item = "/".concat(_owner).concat(all_url[3]);
    }

    return info_component;
  }

  findExistence(element: string, buscado: string): boolean {
    let encontrado = element.indexOf(buscado) != -1 || element.includes(buscado);
    return encontrado;
  }

}