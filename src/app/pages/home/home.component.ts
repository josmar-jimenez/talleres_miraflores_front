import { Component,Renderer2, OnInit } from '@angular/core';
import { propiedades_globales as prop_glo}  from '../../globals';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {   
      
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService:AuthService)
    { }
    
  ngOnInit(): void { }

}
