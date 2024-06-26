import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NewAccountComponent} from "./new-account/new-account.component";

const routes: Routes = [
  {path :"login", component : LoginComponent},
  {path :"", redirectTo : "/login", pathMatch : "full"},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthenticationGuard],
    children : [
      {path :"customers", component : CustomersComponent},
      {path :"accounts", component : AccountsComponent},
      {path :"new-account", component : NewAccountComponent, canActivate : [AuthorizationGuard], data : {role:"ADMIN"}},
      {path :"new-customer", component : NewCustomerComponent, canActivate : [AuthorizationGuard], data : {role:"ADMIN"}},
      {path :"customer-accounts/:id", component : CustomerAccountsComponent},
      {path :"notAuthorized", component : NotAuthorizedComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
