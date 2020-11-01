import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HapiService} from '../hapi.service';
import {store, loginUser} from '../store'; 
import { User } from '../store/User';

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
    private route: ActivatedRoute,
    private router: Router,
    private hapiService: HapiService
) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }


  onSubmit(event: any) {
    //TODO see if we still need it.
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.hapiService.checkBackendHealth()
      .subscribe(response => {
        const status = response.status;
        if(status === 200) {
          const username = event.target.username.value;
          const password = event.target.password.value;
          const user = <User>{username, password};
          store.dispatch(loginUser(user));
          this.router.navigate(['home'])
        }
      },
      error => {
        alert(`We cannot log you in at the moment. Status: ${status}`);
      })
}

}
