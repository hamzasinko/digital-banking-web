import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountsService } from "../services/accounts.service";
import { CustomerService } from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {NewAccount} from "../model/newAccount.model";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  newAccountFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.newAccountFormGroup = this.fb.group({
      accountType: this.fb.control(null, [Validators.required]),
      balance: this.fb.control(null, [Validators.required]),
      overDraft: this.fb.control(null),
      interestRate: this.fb.control(null),
      customerId: this.fb.control(null, [Validators.required, Validators.min(1)])
    });

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        const customersLen = customers.length;
        this.newAccountFormGroup.get('customerId')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(customersLen)
        ]);
        this.newAccountFormGroup.get('customerId')?.updateValueAndValidity();
      },
      error: (err) => {
        console.error('Error occurred while fetching customers:', err);
      }
    });
  }

  handleSaveAccount() {
    let newAccount:NewAccount = this.newAccountFormGroup.value;
    let accountOwner:Customer;
    this.customerService.getCustomer(newAccount.customerId).subscribe({
      next: (customer) => {
        accountOwner = customer;
      },
      error: (err) => {
        console.error('Error occurred while searching for customer:', err);
      }
    });
    if((newAccount.accountType=="CurrentAccount"&& newAccount.overDraft)||(newAccount.accountType=="SavingAccount"&& newAccount.interestRate)){
      this.accountsService.saveAccount(newAccount).subscribe({
        next : data=>{
          alert("Account has been saved successfully!")
          this.router.navigateByUrl("/admin/customer-accounts/"+accountOwner.id,{state : accountOwner})
        },
        error : err => {
          console.log(err);
        }
      });
    }else {
      alert("you have to enter the over draft or the interest rate")
      this.newAccountFormGroup.reset();
    }
  }
}
