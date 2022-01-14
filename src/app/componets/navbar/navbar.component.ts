import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { propiedades_globales as prop_glo } from 'src/app/globals';  

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {   

  public SRC_LOGO:any = prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.url_logo_owner); 
  public info_component:any = prop_glo.info_globals.info_component;

  constructor(    
    private router: Router,   
    public translate: TranslateService,
    
  ) {
    translate.addLangs(prop_glo.info_globals.idiomas.config);
    translate.setDefaultLang(prop_glo.info_globals.idiomas.default);
  }

  ngOnInit(): void {  }
 
  getPathActive():string{ 
    let ruta = this.router.url;
    return ruta.split('/')[1];
  }

  getModuleActive():string{ 
    let ruta = this.router.url; 
    return ruta.split('/')[2];
  }

}
