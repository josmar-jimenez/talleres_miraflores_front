import { Component, OnInit } from '@angular/core';
import { propiedades_globales as prop_glo } from 'src/app/globals';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit { 

  public isMobile: boolean = false;  

  constructor( 
    private deviceService: DeviceDetectorService
    ) {    }

  public info_footer: any =  prop_glo.footer; 

  ngOnInit(): void { 
    this.isMobile = this.deviceService.isMobile();
  }

}
