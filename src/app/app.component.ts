import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';  
import { Router  } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titte = "Super opciones";
  public isLoggin: any = false;
  
  constructor(
    private router: Router, private authService:AuthService
  ) {
    
    this.isLoggin = this.authService.isAuthenticated(); 
  }

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isIndexPage(): boolean {
    return this.router.url==='/index';
  }
}