import { Injectable } from "@angular/core";
import { Payment } from ".././class/payment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  constructor(private _http: HttpClient) {}
  postpayment(storepayment: Payment) {
    return this._http.post<any>(
      "http://localhost:3000/savethem/donatepayment/payment",
      storepayment
    );
  };
  postpaypal(storepayment: Payment) {
    return this._http.post<any>(
      "http://localhost:3000/savethem/donatepayment/paymentpaypal",
      storepayment
    );
  }
}
