import { Component, OnInit } from '@angular/core';
import { DonationMaterial } from '../class/donation-material';
import { CharityService } from '../services/charity.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public code;
  public ID;


  Material : DonationMaterial[]=[];


  constructor(private _CharityService:CharityService,  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });


    this._CharityService.listmaterialitem(this.code).subscribe(
      data => {
        this.Material = data as  DonationMaterial[];
       console.log(data)
        this.ID = this.code.slice(0, 9);
  
    
      },
      error => {
console.log(error)
      }
    )



  }

}
