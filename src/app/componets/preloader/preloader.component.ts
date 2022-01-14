import { Component, HostListener, OnInit } from '@angular/core';  
import { propiedades_globales as prop_glo}  from '../../globals';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit { 
  public src_logo:any = prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.url_logo_owner); 
  constructor( ) { }

  ngOnInit(): void { }
   
}
