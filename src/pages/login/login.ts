import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthProvider) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.required]
    })
  }

  async loginSubmitForm(): Promise<void> {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      console.log('the form is not valid');
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();
      try {
        await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        await loading.dismiss();
        this.navCtrl.setRoot('TodoListPage');
      }
      catch (err) {
        await loading.dismiss();
        console.log(err);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
