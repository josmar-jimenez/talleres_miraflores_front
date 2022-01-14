import { Component, OnInit, Input } from '@angular/core'; 
import { TranslateService } from '@ngx-translate/core';
import { propiedades_globales as prop_glo}  from '../../globals';

@Component({
    selector: 'app-pagination-list',
    template: ` 
            <div class="dataTables_paginate paging_simple_numbers" id="paginador"> 
                        <pagination-controls
                            (pageChange)="paginador.num_page = $event"
                            [autoHide]="true" [responsive]="true"
                            previousLabel="{{paginador.label_paginador_ant | translate}}"
                            nextLabel="{{paginador.label_paginador_sig | translate}}">
                        </pagination-controls> 
            </div>
    `
})


export class ActionPaginationListComponent implements OnInit {
    constructor( 
            public translate: TranslateService
        ) {
          translate.addLangs(prop_glo.info_globals.idiomas.config);
          translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
        }

    @Input() paginador!: any; 

    ngOnInit(): void { }

}
