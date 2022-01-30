import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { MenuAutorization } from 'src/app/model/menu/menu-autorization';  

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})

export class MainHeaderComponent implements OnInit {
  
  public modulosPermitidos: MenuAutorization[] = [];
  public userName:any ="";
  public storeName:any ="";
  public actualDate:number = Date.now();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.actualDate = Date.now();
      }
    });
    this.userName = this.authService.getPersonalName();
    this.storeName = this.authService.getStoreName();
  }

  nglogOut() {
    this.authService.logOut();
  } 

}
