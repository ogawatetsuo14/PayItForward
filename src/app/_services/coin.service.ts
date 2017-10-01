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

    getTranByAddress(address: string){
      console.log("getTranByEmail is fired!!");
      console.log(address);
      return this.http.get('/api/getrecords/'+ address,this.jwt()).map((response:Response) => response.json());
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