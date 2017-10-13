import { Component, OnInit } from '@angular/core';
import { AlertService, CoinService } from '../_services/index';
import { Record } from '../_models/index';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  loading = false;

  all100s: Record[] = [];
  alllog: Record[] = [];

  constructor(private coinService: CoinService,private alertService: AlertService) { }

  ngOnInit() {
    this.getAll100Records();
  }

  getAll100Records() {
    this.coinService.getTranAll100()
    　　.subscribe(
      　　records => { 
      　　　this.all100s = records; 
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
      　　　new Angular2Csv(records,'payitforward.log',{headers: Object.keys(records[0])}); 
    　　  },
          error => {
            this.alertService.error(error);
            this.loading = true;
          }
        );
  }

}
