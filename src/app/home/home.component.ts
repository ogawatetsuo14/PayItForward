import { Component, OnInit, NgZone, ViewContainerRef, ViewChild } from '@angular/core';
import { User } from '../_models/index';
import { AlertService, UserService, ModalService } from '../_services/index';
import { DialogComponent, TOKEN} from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService,private modal: ModalService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

  onDialogClick(type){
    const provider = {provide: TOKEN,useValue: type};
    console.log("type is " + type);
    this.modal.open(DialogComponent, provider);
  }
}