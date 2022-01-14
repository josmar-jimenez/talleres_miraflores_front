import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  public notification: EventEmitter<any> = new EventEmitter<any>();

  public use_cache!: boolean;

  // Para emitir un mensaje, se importa el servivicio y se hace uso de este metodo.
  sendMessage(obj: any) {
    this.notification.emit(obj);
  }

  //Para recibir el mensaje emitido, se debe importar el servicio donde se requiera y utilizar el siguiente metodo.
  //EJ: this.notificationService.getIssuedMessage().subscribe( (issued:any) => {console.log(issued)} );
  getIssuedMessage() {
    return this.notification;
  }

  setVisualizeLoading(value: boolean) {
    this.notification.emit(value);
  }

  getVisualizeLoading(){
    return this.notification;
  }

  set useCache(value: boolean) {
    this.use_cache = value;
  }

  get useCache(): boolean {
    return this.use_cache;
  }
}
