import { Injectable } from '@angular/core';
import {AccountDetails} from "../model/account.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerAccounts} from "../model/customerAccounts.model";
import {Customer} from "../model/customer.model";
import {NewAccount} from "../model/newAccount.model";

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
  public saveAccount(newAccount : NewAccount):Observable<CustomerAccounts>{
    let data: NewAccount = {
      accountType: newAccount.accountType,
      balance: +newAccount.balance,  // Explicitly cast to number
      overDraft: +(newAccount.overDraft || 0),  // Explicitly cast to number
      interestRate: +(newAccount.interestRate || 0),  // Explicitly cast to number
      customerId: +newAccount.customerId  // Explicitly cast to number
    };
    return this.http.post<CustomerAccounts>(this.backendHost+"/account",data)
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
