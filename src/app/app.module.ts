import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "./services/auth.service";
import {AccountsService} from "./services/accounts.service";
import {CustomerService} from "./services/customer.service";
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AdminTemplateComponent,
    CustomerAccountsComponent,
    CustomersComponent,
    LoginComponent,
    NavbarComponent,
    NewCustomerComponent,
    NotAuthorizedComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    CustomerService,
    AccountsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
