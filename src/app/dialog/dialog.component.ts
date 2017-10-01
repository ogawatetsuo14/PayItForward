import { Component, OpaqueToken, Inject, Input } from '@angular/core';
import { ModalService, UserService, CoinService, AlertService } from '../_services/index';
import { User } from '../_models/index';

export const TOKEN = new OpaqueToken('complete.text');

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  users: User[] =[];
  username: string;
  currentUser: User;

  model: any = {};
  loading = true;

  constructor(
    @Inject(TOKEN) t: string,
    private userService: UserService,
    private modal: ModalService,
    private coinService: CoinService,
    private alertService: AlertService
  ) {
    this.loadAllUsers();
    this.translate(t);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model.from = this.currentUser.address;
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
      case 'gb10':
        this.model.amount = 10;
        this.model.type = '元気玉';
        break;
      case 'gb15':
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
    this.model.to = this.users[num].address;
    this.username = this.users[num].username;
    console.log("Name is " + this.username);
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
