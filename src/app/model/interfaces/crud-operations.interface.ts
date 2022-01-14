 import { Observable } from 'rxjs';


export interface CrudOperations<T, ID> {
	save(t: T): Observable<T>;
	update(id: ID, t: T): Observable<T>;
	findOne(id: ID): Observable<T>;
	findAll(use_cache:boolean): Observable<T[]>;
	findAllOptions(): Observable<T[]>;
	delete(id: ID): Observable<any>;
}