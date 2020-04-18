import { Component, OnInit } from '@angular/core';
import { DonationMaterial } from '../class/donation-material';
import { CharityService } from '../services/charity.service'
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {





  constructor(private _CharityService:CharityService) { }

  ngOnInit() {

  }

}
