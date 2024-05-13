import { PaidStatusEnum } from "../enums/PaidStatusEnum";

export interface IReceivableAccount {
  id?: string,
  title: string,
  company: string,
  date: string,
  value: string,
  status: PaidStatusEnum
}
