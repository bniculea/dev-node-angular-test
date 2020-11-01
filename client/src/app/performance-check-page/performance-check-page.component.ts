import { Component, OnInit } from '@angular/core';
import {store} from '../store'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-performance-check-page',
  templateUrl: './performance-check-page.component.html',
  styleUrls: ['./performance-check-page.component.css']
})
export class PerformanceCheckPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!store.getState().loggedUser){
      this.router.navigate(['login'])
    }
  }

}
