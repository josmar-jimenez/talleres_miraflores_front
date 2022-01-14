import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.css']
})
export class  ErrorPagesComponent implements OnInit {
  tipoError = 400; 

  constructor() { }

  ngOnInit(): void {
  }
  
}
