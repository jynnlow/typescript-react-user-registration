import { SweetAlertType } from "react-bootstrap-sweetalert/dist/types";

export type User = {
  username: string, 
  password: string
}

export type Response = {
  data: {
    status: string,
    message: string
  }
}

export type Alert = {
  show: boolean,
  type?: SweetAlertType,
  title?: string,
  message?: string,
  btnText?: string,
  btnType?: string
}

export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAIL = "FAIL"
}

export enum AlertType {
  SUCCESS = "success",
  DANGER = "danger",
  CONTROLLED = "controlled",
  WARNING ="warning",
  DEFAULT = "default"
}

export enum AlertBtnText {
  CONFIRM = "Confirm",
  OK = "OK"
}

