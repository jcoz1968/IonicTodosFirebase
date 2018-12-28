import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  AlertController,
  Loading
} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountPage {
  registerForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider
  ) {
    this.registerForm = this.fb.group({
      fName: [ '', Validators.compose([ Validators.required ]) ],
      lName: [ '', Validators.compose([ Validators.required ]) ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [ '', Validators.compose([Validators.required]) ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  registerSubmit(): void {
    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.authProvider
        .signUpUser(
          this.registerForm.value.email,
          this.registerForm.value.fName,
          this.registerForm.value.lName,
          this.registerForm.value.password
        )
        .then(
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
    }
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
