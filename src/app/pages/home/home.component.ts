import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Summary } from 'src/app/model/data/summary';
import { SummaryService } from 'src/app/services/data/summary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public use_cache: boolean = false;  
  public summariesList:Array<Summary>= [];

  constructor(
    private router: Router,
    private summaryService: SummaryService
 ) { 
    }

  ngOnInit(): void { 
    this.summaryService.findAll(this.use_cache).subscribe((data: any) => {
      console.log(data);
      this.summariesList = data.info;
    }, error => {
      console.log(error);
    });
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
