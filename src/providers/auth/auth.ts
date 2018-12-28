import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {
  newUser: User = null;
  constructor() { }

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
