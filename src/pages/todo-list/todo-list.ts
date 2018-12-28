import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';

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

  logout() {
    alert('log out');
  }

}
