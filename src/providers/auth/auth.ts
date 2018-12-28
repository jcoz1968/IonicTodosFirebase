import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {
  newUser: User = null;
  constructor(private platform: Platform) { }

  async signUpUser(
    email: string,
    firstname: string,
    lastname: string,
    password: string
 ): Promise<any> {
    try {
      this.newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firebase
        .database()
        .ref(`/userProfile/${this.newUser.uid}`)
        .set({
          email: email,
          firstname: firstname,
          lastname: lastname
        });
    } catch (err) {
      throw err;
    }
  }

  async loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle(): Promise<any> {
    if (this.platform.is('cordova')) {
      // if running in native mode
    } else {
      console.log('Auth.ts Google');
    }
  }

  logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          let loggedOut = true;
          resolve(loggedOut)
        }).catch((err: any) => {
          reject(err);
        });
    });
  }



}
