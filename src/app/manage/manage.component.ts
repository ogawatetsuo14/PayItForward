import { Component, OnInit } from '@angular/core';
import { AlertService, CoinService } from '../_services/index';
import { Record } from '../_models/index';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  loading = false;

  rcv10: Record[] = [];
  snt10: Record[] = [];
  alllog: Record[] = [];

  constructor(private coinService: CoinService,private alertService: AlertService) { }

  ngOnInit() {
    this.getRcv10Records();
    this.getSnt10Records();
  }

  getRcv10Records() {
    this.coinService.getTranRcv10()
    　　.subscribe(
      　　records => { 
      　　　this.rcv10 = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }

  getSnt10Records() {
    this.coinService.getTranSnt10()
    　　.subscribe(
      　　records => { 
      　　　this.snt10 = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }

  getAllRecords() {
    this.coinService.getTranAll()
    　　.subscribe(
      　　records => { 
      　　　this.alllog = records; 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }

}
