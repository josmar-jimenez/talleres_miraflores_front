import { Component, OnInit } from '@angular/core';
import { propiedades_globales as prop_glo } from 'src/app/globals'; 

@Component({
  selector: 'app-index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public NO_IMAGE = prop_glo.info_globals.info_component.no_image ;
  public productsList:Array<string>= [];
  public info_component: any =  prop_glo.info_globals.info_component;

  constructor() { }

  ngOnInit(): void {
  }

  goToFounds($element:any): void {
    this.productsList.push("test");
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
