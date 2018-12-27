import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.required]
    })
  }

  loginSubmitForm() {
    console.log(this.loginForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
