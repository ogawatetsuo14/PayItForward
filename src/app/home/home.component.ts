import { Component, OnInit, NgZone, ViewContainerRef, ViewChild } from '@angular/core';
import { User } from '../_models/index';
import { AlertService, UserService, ModalService,CoinService } from '../_services/index';
import { DialogComponent, TOKEN} from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  recieved: Number;
  sent: Number;
  loading: Boolean = false;

  constructor(private userService: UserService,private modal: ModalService,private alertService: AlertService,private coinService: CoinService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getRecieved(this.currentUser.address);
    this.getSent(this.currentUser.address);
  }

  onDialogClick(type){
    const provider = {provide: TOKEN,useValue: type};
    console.log("type is " + type);
    this.modal.open(DialogComponent, provider);
  }

  getRecieved(address) {
    this.loading = true;
    this.coinService.getRecieved(address)
        .subscribe(
            data => {
                //this.router.navigate([this.returnUrl]);
                console.log("getRecieved: "+data);
                this.recieved = data;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  getSent(address) {
    this.loading = true;
    this.coinService.getSent(address)
        .subscribe(
            data => {
                //this.router.navigate([this.returnUrl]);
                console.log("getSent: "+data);
                this.sent = data;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}