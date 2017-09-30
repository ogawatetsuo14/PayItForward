import { Component, OpaqueToken, Inject, Input } from '@angular/core';
import { ModalService, UserService } from '../_services/index';
import {User} from '../_models/index';

export const TOKEN = new OpaqueToken('complete.text');

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  amount: number;
  type: string;

  users: User[] =[];
  username: string;

  constructor(@Inject(TOKEN) t: string,private userService: UserService,private modal: ModalService) {
    this.loadAllUsers();
    this.translate(t);
  }

  close() {
    this.modal.close();
  }

  translate(data){
    switch(data) {
      case 'th5':
        this.amount = 5;
        this.type = 'ありがとう';
        break;
      case 'th10':
        this.amount = 10;
        this.type = 'ありがとう';
        break;
      case 'th15':
        this.amount = 15;
        this.type = 'ありがとう';
        break;
      case 'gj5':
        this.amount = 5;
        this.type = 'よくできました';
        break;
      case 'gj10':
        this.amount = 10;
        this.type = 'よくできました';
        break;
      case 'gj15':
        this.amount = 15;
        this.type = 'よくできました';
        break;
      case 'ey5':
        this.amount = 5;
        this.type = '期待しているよ';
        break;
      case 'ey10':
        this.amount = 10;
        this.type = '期待しているよ';
        break;
      case 'ey15':
        this.amount = 15;
        this.type = '期待しているよ';
        break;
      case 'gk5':
        this.amount = 5;
        this.type = '元気玉';
        break;
      case 'gb10':
        this.amount = 10;
        this.type = '元気玉';
        break;
      case 'gb15':
        this.amount = 15;
        this.type = '元気玉';
        break;
      default:
        this.amount = 5;
        this.type = 'ありがとう';
    }
  }

  send(name) {
    console.log(name);
  }

  select(num){
    this.username = this.users[num].username;
    console.log("Name is " + this.username);
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
