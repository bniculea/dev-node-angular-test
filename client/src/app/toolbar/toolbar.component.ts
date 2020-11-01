import { Component, OnInit } from '@angular/core';
import {store, logoutCurrentUser} from '../store'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isUserLoggedIn:Boolean = false;
  loggedUser:string = null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    store.subscribe(()=> {
      this.updateFromState();
    })
  }

  onLogoutClick(){
    store.dispatch(logoutCurrentUser());
    this.router.navigate(['login']);
  }

  updateFromState(){
    const state = store.getState();
    this.isUserLoggedIn = !!state.loggedUser;
    this.loggedUser = this.isUserLoggedIn ? state.loggedUser.username : null;
  }
  onGenerateDataClick(){
    this.router.navigate(['generate']);
  }

  onDurationCheckClick(){
    this.router.navigate(['performanceCheck']);
  }

}
