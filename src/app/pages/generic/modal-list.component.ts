import { Component,Renderer2, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  


@Component({
  selector: 'app-modal-list',
  template:  ` 
  <!-- Modal   routerLink="{{ rutaActiva +'/consultar'+'/'+ item.id}}" -->
  <div class="modal fade" id="deleteItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Eliminar {{ rutaActiva.replace("/","") +" "+ item.id}} </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"> 
         ¿Desea eliminar este registro?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger"   routerLink="{{ rutaActiva +'/eliminar'+'/'+ item.id}}"> Eliminar </button>
        </div>
      </div>
    </div>
  </div>
  ` 
})


export class ModalListComponent implements OnInit {    
  constructor(
      private router: Router,
      private toastr: ToastrService,
      private renderer: Renderer2,
      private authService:AuthService
    ) { }
  
  @Input() item!: any;
  @Input('rutaActiva') rutaActiva = ''; // tslint:disable-line: no-input-rename
    
  ngOnInit(): void { 
 
  }
  
}
