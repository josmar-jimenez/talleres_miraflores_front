import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { propiedades_globales as prop_glo } from '../../globals';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent implements OnInit {

  public actionAllowed: any = [];

  constructor(
    private notificationService: NotificationsService,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
  }

  public label_btn: any = prop_glo.label_btn;

  @Input() id: any;
  @Input() acciones_crud: any;

  ngOnInit(): void {
    var operativeSelected = this.authService.loadModuleMenu(this.router.url);
    this.actionAllowed = operativeSelected != null && operativeSelected.length > 0 ? operativeSelected[0].action_name : null;
  }

}
