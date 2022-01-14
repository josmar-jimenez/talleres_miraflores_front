import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit { 
  constructor( 
    private authService:AuthService ,
    private notificationService:NotificationsService,
    public translate: TranslateService
    ) {
      translate.addLangs(prop_glo.info_globals.idiomas.config);
      translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
    }

  public info_footer: any =  prop_glo.footer; 

  ngOnInit(): void { 
  }

}
