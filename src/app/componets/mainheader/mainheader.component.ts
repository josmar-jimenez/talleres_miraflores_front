import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { propiedades_globales as prop_glo } from 'src/app/globals'; 
import { MenuAutorization } from 'src/app/model/menu/menu-autorization';  

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})

export class MainHeaderComponent implements OnInit {
  
  public modulosPermitidos: MenuAutorization[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.modulosPermitidos = this.authService.loadModuleMenu(null);
      }
    });
  }

  nglogOut() {
    this.authService.logOut();
  } 
 

}
