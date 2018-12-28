import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authService: AuthProvider) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  googleLogin(): void {
    this.authService.loginWithGoogle();
  }

  signUpUsers(): void {
    console.log('signup');
    this.navCtrl.push('CreateAccountPage');
  }

}
