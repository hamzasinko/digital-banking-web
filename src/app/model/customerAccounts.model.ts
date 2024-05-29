import {Customer} from "./customer.model";

export interface CustomerAccounts {
  type:          string;
  id:            string;
  balance:       number;
  createdAt:     Date;
  status:        string;
  customerDto:   Customer;
  interestRate?: number;
  overDraft?:    number;
}
