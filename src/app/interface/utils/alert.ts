import {alertType} from "../../enum/alert-type";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: alertType;
}