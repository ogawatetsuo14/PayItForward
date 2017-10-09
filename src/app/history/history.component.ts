import { Component, OnInit } from '@angular/core';
import { ModalService, UserService, CoinService, AlertService } from '../_services/index';
import { User, Record } from '../_models/index';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  loading = false;
  currentUser: User;

  records: Record[] = [];

  constructor(
    private userService: UserService,
    private coinService: CoinService,
    private alertService: AlertService
  ) { 
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getRecievedRecords() {
    console.log(this.currentUser.address);
    this.coinService.getTranByTaddress(this.currentUser.address)
    　　.subscribe(
      　　records => { 
           console.log(records);
      　　　this.records = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }

  getSentRecords() {
    console.log(this.currentUser.address);
    this.coinService.getTranByFaddress(this.currentUser.address)
    　　.subscribe(
      　　records => { 
           console.log(records);
      　　　this.records = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }
}