export interface NewAccount {
  accountType: string;
  balance: number;
  overDraft?: number;
  interestRate?: number;
  customerId: number;
}
