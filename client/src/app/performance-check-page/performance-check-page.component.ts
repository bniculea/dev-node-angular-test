import { Component, OnInit } from '@angular/core';
import {store} from '../store'; 
import { Router } from '@angular/router';
import {HapiService} from '../hapi.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-performance-check-page',
  templateUrl: './performance-check-page.component.html',
  styleUrls: ['./performance-check-page.component.css']
})
export class PerformanceCheckPageComponent implements OnInit {

  duration: number;

  constructor(
      private router: Router,    
      private hapiService: HapiService,
      private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if(!store.getState().loggedUser){
      this.router.navigate(['login'])
    } else {
      this.getDuration();
    }
  }

  recheckDuration(){
    this.getDuration();
  }

  getDuration(){
    this.hapiService.getAggregationTime()
    .subscribe(response=> {
      this.duration = response.body.duration;
      this.matSnackBar.open("Successfully refreshed the duration", "Success", {
        duration: 1000,
      });
    },
    error=> {
      this.matSnackBar.open("Could not retrieve the duration", "Error", {
        duration: 1000,
      });
    })
  }

}
