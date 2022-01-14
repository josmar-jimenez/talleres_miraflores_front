import { Component,  Input,  OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { propiedades_globales as prop_glo}  from '../../../globals';

@Component({
    selector: 'app-loading-component',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'] 
})
 
export class LoadingComponent implements OnInit {
    constructor( 
        public translate: TranslateService,
        private notificationService:NotificationsService
    ) {
        translate.addLangs(prop_glo.info_globals.idiomas.config);
        translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
     }
    public use_loading: boolean = false; 

    public label: any = prop_glo.label_component;

    ngOnInit(): void { 
        this.notificationService.getVisualizeLoading().subscribe( 
            (estado:any) => {
                this.use_loading = estado; 
            }
        ); 
    } 
 
}
