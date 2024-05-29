import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails} from "../model/account.model";
import {CustomerAccounts} from "../model/customerAccounts.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit{
  customerId! : string;
  customer! : Customer;
  accounts! : Observable<Array<CustomerAccounts>>;
  errorMessage! : string;
  constructor(private route:ActivatedRoute, private router:Router,private accountsService:AccountsService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.accounts = this.accountsService.getCustomerAccount(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
