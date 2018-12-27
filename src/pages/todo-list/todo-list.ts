import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';

/**
 * Generated class for the TodoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {
  listsItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider) {
    this.listsItems = this.dataService.lists;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
  }

}
