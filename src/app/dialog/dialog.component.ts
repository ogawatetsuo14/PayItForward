import { Component, OpaqueToken, Inject, Input, OnInit } from '@angular/core';
import { ModalService, UserService, CoinService, AlertService } from '../_services/index';
import { User } from '../_models/index';
import { Transaction } from '../_models/index';

export const TOKEN = new OpaqueToken('complete.text');

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  users: User[] =[];
  username: string;
  currentUser: User;
  to:any = {};
  from:any = {};

  model: any = {};
  //tran: Transaction;
  loading = true;

  constructor(
    @Inject(TOKEN) t: string,
    private userService: UserService,
    private modal: ModalService,
    private coinService: CoinService,
    private alertService: AlertService
  ) {
    console.log("dialogcomponent's constructor is fired!!")
    this.loadAllUsers();
    this.translate(t);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.from.username = this.currentUser.username;
    this.from.address = this.currentUser.address;
    this.from.company = this.currentUser.company;
    this.from.email = this.currentUser.email;
    this.model.from = this.from;
  }

  close() {
    this.modal.close();
  }

  translate(data){
    switch(data) {
      case 'th5':
        this.model.amount = 5;
        this.model.type = 'ありがとう';
        break;
      case 'th10':
        this.model.amount = 10;
        this.model.type = 'ありがとう';
        break;
      case 'th15':
        this.model.amount = 15;
        this.model.type = 'ありがとう';
        break;
      case 'gj5':
        this.model.amount = 5;
        this.model.type = 'よくできました';
        break;
      case 'gj10':
        this.model.amount = 10;
        this.model.type = 'よくできました';
        break;
      case 'gj15':
        this.model.amount = 15;
        this.model.type = 'よくできました';
        break;
      case 'ey5':
        this.model.amount = 5;
        this.model.type = '期待しているよ';
        break;
      case 'ey10':
        this.model.amount = 10;
        this.model.type = '期待しているよ';
        break;
      case 'ey15':
        this.model.amount = 15;
        this.model.type = '期待しているよ';
        break;
      case 'gk5':
        this.model.amount = 5;
        this.model.type = '元気玉';
        break;
      case 'gk10':
        this.model.amount = 10;
        this.model.type = '元気玉';
        break;
      case 'gk15':
        this.model.amount = 15;
        this.model.type = '元気玉';
        break;
      default:
        this.model.amount = 5;
        this.model.type = 'ありがとう';
    }
  }

  send() {
    this.loading = true;
    this.model.datetime = Date.now();
    if (this.model.comment === undefined){
      this.model.comment = " ";
    }
    this.coinService.sendCoin(this.model)
        .subscribe(
            data => {
                // this.alertService.success('Send conins successful', true);
                this.close();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  select(num){
    this.loading = false;
    this.to.address = this.users[num].address;
    this.to.username = this.users[num].username;
    this.to.email = this.users[num].email;
    this.to.company = this.users[num].company;
    this.model.to = this.to;
    this.username = this.users[num].username;
    console.log("Name is " + this.username);
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
