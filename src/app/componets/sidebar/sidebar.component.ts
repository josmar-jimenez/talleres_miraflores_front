import { Component, OnInit, Renderer2 } from '@angular/core'; 
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { Router, Event, NavigationEnd } from '@angular/router';
import { MenuAutorization } from 'src/app/model/menu/menu-autorization';
import { propiedades_globales as prop_glo}  from '../../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public modulosPermitidos: MenuAutorization[] = []; 
  public prop_globales:any = prop_glo;
  public prop_img_user:any;
  public prop_img_brand:any;
  public userActive:any;
  public hover:boolean = false;

  constructor(private authService: AuthService, 
    private renderer: Renderer2, private router:Router) { }

  ngOnInit(): void {
    this.addClassBody('hold-transition control-sidebar-slide-open sidebar-mini-md sidebar-collapse');   

    this.userActive = this.authService.getUserName()?.concat("");
    
    this.prop_img_brand =  prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.url_logo_owner);
    this.prop_img_user = prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.default_img);

    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        this.modulosPermitidos = this.authService.loadModuleMenu(null);
      }
    });

  } 

  addClassBody(misClases:string):void{
    misClases.split(' ').forEach((className: string) => {
      this.renderer.addClass(document.body, className);
   });    
  }   

}
