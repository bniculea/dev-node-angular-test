import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HapiService} from '../hapi.service';
import {store, loginUser} from '../store'; 
import { User } from '../store/User';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  loggedUser:User = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hapiService: HapiService,
    private matSnackBar: MatSnackBar
) { }


  ngOnInit(): void {
    if(store.getState().loggedUser) {
      this.router.navigate(["home"]);
    }
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }


  onSubmit(event: any) {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this.hapiService.checkBackendHealth()
      .subscribe(response => {
        const status = response.status;
        if(status === 200) {
          const username = event.target.username.value;
          const password = event.target.password.value;
          const user = <User>{username, password};
          store.dispatch(loginUser(user));
          this.router.navigate(['home'])
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        this.matSnackBar.open("Something bad happened. Try again later", "Error", {
          duration: 2000,
        });
      })
}

}
