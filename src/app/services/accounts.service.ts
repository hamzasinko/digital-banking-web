import { Injectable } from '@angular/core';
import {AccountDetails} from "../model/account.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerAccounts} from "../model/customerAccounts.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http:HttpClient) { }
  backendHost : string="http://localhost:8085";
  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost+"/account/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public getCustomerAccount(customerId : string){
    return this.http.get<Array<CustomerAccounts>>(this.backendHost+"/account/customer/"+customerId);
  }
  public debit(accountId : string, amount : number, description : string){
    let data = {accountId : accountId, amount : amount, description : description}
    return this.http.post(this.backendHost+"/account/debit",data)
  }
  public credit(accountId : string, amount : number, description : string){
    let data = {accountId : accountId, amount : amount, description : description}
    return this.http.post(this.backendHost+"/account/credit",data)
  }
  public transfer(accountSource : string,accountDestination : string , amount : number, description : string){
    let data = {accountSource : accountSource,accountDestination: accountDestination, amount : amount, description : description}
    return this.http.post(this.backendHost+"/account/transfer",data)
  }
}
