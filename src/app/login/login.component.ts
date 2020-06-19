import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../shared/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  invalidCred = false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticateService,
              private router: Router) { }
  public get _router() {
      return this.router;
  }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          emailId: ['',  Validators.required],
          password: ['',  Validators.required]
      });
}

  login() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      const formData = this.loginForm.value;
      console.log(formData);
      this.authenticationService.checkUser(formData)
      .subscribe(data => {
        if (data){
          this.invalidCred = false;
          this.authenticationService.userAuthenticated = true;
          this.router.navigate(['dashboard']);
        } else {
          this.invalidCred = true;
          this.router.navigate(['login']);
        }
      });
    }
  }

}
