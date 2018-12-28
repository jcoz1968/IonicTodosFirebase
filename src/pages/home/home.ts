import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Loading } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loading: Loading;

  constructor(public navCtrl: NavController,
    private authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  googleLogin(): void {
    this.authService.loginWithGoogle().then(
      authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot('TodoListPage');
        });
      },
      error => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: 'ok',
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  twitterLogin(): void {
    this.authService.loginWithTwitter();
  }

  githubLogin(): void {
    this.authService.loginWithGitHub();
  }

  signUpUsers(): void {
    console.log('signup');
    this.navCtrl.push('CreateAccountPage');
  }

}
