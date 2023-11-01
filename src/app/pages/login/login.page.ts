import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public message: string = "";
  public message2: string = "";
  public message3: string = "";
  form!: FormGroup;
  login: String = 'RTX@g.com';
  password: String = 'RTX3060ti';
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
  navigateToHomePage() {
    if (this.form.get('email')?.value == this.login) {
      this.message = "";
      if (this.form.get('password')?.value == this.password)
        this.router.navigate(['home']);
      else
        this.message2 = "Incorrect password";
    }
    else {
      this.message = "";
      this.message = "No email exist";
    }
  }
}
