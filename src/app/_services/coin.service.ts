import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { Transaction } from '../_models/index';

@Injectable()
export class CoinService {
    constructor(private http: Http) { }

    sendCoin(tran: Transaction){
        return this.http.post('api/send',tran, this.jwt()).map((response:Response) => response.json());
    }

    getTranByTaddress(address: string){
      console.log("getTranByTaddress is fired!!");
      console.log(address);
      return this.http.get('/api/getrcvrecords/'+ address,this.jwt()).map((response:Response) => response.json());
    }

    getTranByFaddress(address: string){
        console.log("getTranByFaddress is fired!!");
        console.log(address);
        return this.http.get('/api/getsntrecords/'+ address,this.jwt()).map((response:Response) => response.json());
    }

    getTranAll(){
        console.log("getTranAll is fired!!");
        return this.http.get('/api/getallrecords',this.jwt()).map((response:Response) => response.json());
    }

    getTranSnt10(){
        console.log("getTranSnt10 is fired!!");
        return this.http.get('/api/getsnt10records',this.jwt()).map((response:Response) => response.json());
    }

    getTranRcv10(){
        console.log("getTranRcv10 is fired!!");
        return this.http.get('/api/getrcv10records',this.jwt()).map((response:Response) => response.json());
    }

    getRecieved(address){
        console.log("getRecieved is fired!!");
        console.log(address);
        return this.http.get('/api/getrecieved/'+ address,this.jwt()).map((response:Response) => response.json());
    }


    getSent(address){
        console.log("getSent is fired!!");
        console.log(address);
        return this.http.get('/api/getsent/'+ address,this.jwt()).map((response:Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}