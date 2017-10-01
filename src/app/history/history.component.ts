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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllRecords(this.currentUser.email);
  }

  private getAllRecords(email:string) {
    this.coinService.getTranByEmail(email)
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