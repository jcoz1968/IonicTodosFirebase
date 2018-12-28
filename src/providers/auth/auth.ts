import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {
  newUser: User = null;
  constructor(private platform: Platform, private twitter:TwitterConnect) { }

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
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(res => {
        // const token = res.credential.accessToken;
        const user: User = res.user;
        let splitName = user.displayName.split(' ');
        firebase
        .database()
        .ref(`/userProfile/${user.uid}`)
        .set({ email: user.email, firstname: splitName[0], lastname: splitName[1] });
        return user;

      }).catch((error) => {
        console.log('error', error);
      });
    }
  }

  async loginWithTwitter():Promise<any> {
    if (this.platform.is('cordova')) {
      console.log('native attempt');
      this.twitter.login().then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
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
