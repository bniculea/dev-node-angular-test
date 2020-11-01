import { Component, OnInit } from '@angular/core';
import {store} from '../store'; 
import { Router } from '@angular/router';
import {HapiService} from '../hapi.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-generate-data',
  templateUrl: './generate-data.component.html',
  styleUrls: ['./generate-data.component.css']
})
export class GenerateDataComponent implements OnInit {

  constructor(
    private router: Router,
    private hapiService: HapiService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(!store.getState().loggedUser){
      this.router.navigate(['login'])
    }
  }

  onGenerateDataClick(){
    this.hapiService.generateData()
      .subscribe(
        response => {
          this.matSnackBar.open("Data was generated", "Success", {
            duration: 1000,
          });
        },
        error => {
          this.matSnackBar.open("There was a problem while generating data", "Error", {
            duration: 2000,
          });
        }
      )
  }

}
