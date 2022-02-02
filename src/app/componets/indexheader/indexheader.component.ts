import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router} from '@angular/router';
import { propiedades_globales as prop_glo } from 'src/app/globals'; 
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-indexheader',
  templateUrl: './indexheader.component.html',
  styleUrls: ['./indexheader.component.css']
})

export class IndexHeaderComponent implements OnInit {
  
  public prop_img_brand:any;
  public isMobile: boolean = false;  

  constructor(
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.prop_img_brand =  prop_glo.info_globals.pages_url_base_img.concat(prop_glo.info_globals.url_logo_owner);
    this.isMobile = this.deviceService.isMobile();
  }

  nglogOut() {
    this.authService.logOut();
  }  
   
  ngHome() {
        this.router.navigateByUrl('/home').then(() => {
          this.authService.reloadPage();
        });
  } 

  ngLogin() {
    this.router.navigateByUrl('/login').then(() => {
      this.authService.reloadPage();
    });
} 

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
