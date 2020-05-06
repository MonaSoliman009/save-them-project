import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../services/payment.service";
import { Payment } from "../class/payment";
import { Router } from "@angular/router";
import { DonationMaterial } from '../class/donation-material';
import { DonatationService } from '../services/donatation.service';
import { CharityService } from '../services/charity.service';
import { AdminService } from '../services/admin.service';
import { Signup } from '../class/signup';
import { PostSeriveService } from '../services/post-serive.service';

declare var require: any;
declare var $: any;

@Component({
  selector: "app-donation",
  templateUrl: "./donation.component.html",
  styleUrls: ["./donation.component.css"],
  providers: [PaymentService]
})
export class DonationComponent implements OnInit {
  Material : DonationMaterial[]=[];

  ispayment = true;
  ismaterial = false;
  public donateamount = "";
  charityHasErr: any;
  errormsg = "";
  errormsgg=""
 i = 0;

  donationMaterial= new DonationMaterial("","","","","","","","","")
  
  constructor(
    private _PaymentService: PaymentService,
    private donateMaterialSerives :DonatationService,
    private router: Router,
    private _AdminService : AdminService,
    private _PostSeriveService: PostSeriveService,

  ) {}
  paymentregister() {
    this.ispayment = true;
    this.ismaterial = false;
  }
  materialregister() {
    this.ispayment = false;
    this.ismaterial = true;
  }

  material() {
    this.ispayment = false;
    this.ismaterial = true;
  }
  online() {
    this.ispayment = true;
    this.ismaterial = false;
  }
  donate(amount) {
    this.donateamount = amount;
  }
  charitydetails:any= new Signup("", "", "", "", "", "", "", "");
 
  ngOnInit() {



    this._AdminService.getcharities().subscribe(
      data  => {
        this.charitydetails = data;

        console.log(this.charitydetails);

      },

      error => {
        console.log("error", error);

      }
    );







  }
  displaybankaccount(charitydetails){
this.new_payment.charityBankAccount=charitydetails.charityBankAccount

console.log(charitydetails.charityBankAccount)

  }
  public new_payment = new Payment("", "", "", "", "", "", "", "", 0);

  onSubmit() {
    console.log(this.new_payment);
    this._PaymentService.postpayment(this.new_payment).subscribe(
      response => {
        this.router.navigate(["done"]);
      },
      error => {
        this.router.navigate(["donation"]);
        this.errormsg = "Somthing went wrong Please try again";
      }
    );
  }
  Validatecharity(charityname) {
    if (charityname === "default") {
      this.charityHasErr = true;
    } else {
      this.charityHasErr = false;
    }
  }
  Donate() {
    this._PostSeriveService.newmaterial(this.donationMaterial);
    
    this._PostSeriveService.getmaterial().subscribe(  
    
      data => {
      this.Material = data as  DonationMaterial[];
      this.i+=1
      this.router.navigate(["/done"]) 
     

    },
    error => {

this.errormsgg="Somthing went wrong Please try again"   })

  }
  
}
