import { Component, OnInit } from '@angular/core';
import { ModalService, UserService, CoinService, AlertService } from '../_services/index';
import { User, Record } from '../_models/index';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  loading = true;
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
    this.getAllRecords(this.currentUser.address);
  }

  private getAllRecords(address:string) {
    console.log(address);
    this.coinService.getTranByAddress(address)
    　　.subscribe(
      　　records => { 
           console.log(records);
      　　　this.records = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
  }
}