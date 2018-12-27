import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fName: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(30)])],
      lName: ['', Validators.compose([Validators.required, Validators.max(50), Validators.min(3)])],
      email: ['', Validators.compose([ Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.min(6)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  registerSubmit() {
    console.log(this.registerForm.value);
  }

}
