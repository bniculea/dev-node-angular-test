import { Component, OnInit } from '@angular/core';
import {store} from '../store'; 
import { Router } from '@angular/router';
import {HapiService} from '../hapi.service';


@Component({
  selector: 'app-generate-data',
  templateUrl: './generate-data.component.html',
  styleUrls: ['./generate-data.component.css']
})
export class GenerateDataComponent implements OnInit {

  constructor(
    private router: Router,
    private hapiService: HapiService
  ) { }

  ngOnInit(): void {
    if(!store.getState().loggedUser){
      this.router.navigate(['login'])
    }
  }

  async onGenerateDataClick(){
    await this.hapiService.generateData()
      .subscribe(
        response => {
          alert("Data was generated");
        },
        error => {
          debugger;
          alert("Nu mere :(" + error);
        }
      )
  }

}
