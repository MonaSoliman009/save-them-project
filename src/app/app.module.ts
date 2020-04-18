import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { from } from "rxjs";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { CharityAccountComponent } from "./charity-account/charity-account/charity-account.component";
import { FooterComponent } from "./footer/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { SignupComponent } from "./signup/signup.component";
import { HttpClientModule } from "@angular/common/http";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { VolunteersignupService } from "./services/volunteersignup.service";
import { PaymentService } from "./services/payment.service";
import { PostSeriveService } from './services/post-serive.service';
import { ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import { DonationComponent } from "./donation/donation.component";
import { CongrateComponent } from "./congrate/congrate.component";
import { CharityhomeComponent } from './charityhome/charityhome.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FollowingComponent } from './following/following.component';
import { AdminCharityComponent } from './admin-charity/admin-charity.component';
import { AdminVolunteerComponent } from './admin-volunteer/admin-volunteer.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { PostsadminComponent } from './postsadmin/postsadmin.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { ResetComponent } from './reset/reset.component';
import {  ConfirmEqualValidatorDirective } from './shared/confirmpass.directive';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeregisterationComponent,
    AboutusComponent,
    HowitworkComponent,
    ContactComponent,
    CharityAccountComponent,
    FooterComponent,
    HomeComponent,
    VolunteerAccountComponent,
    SignupComponent,
    DashBoardComponent,
    DonationComponent,
    CongrateComponent,
    CharityhomeComponent,
    FollowingComponent,
    AdminCharityComponent,
    AdminVolunteerComponent,
    AddadminComponent,
    PostsadminComponent,
    ForgetpassComponent,
    ResetComponent,
    ConfirmEqualValidatorDirective,
    NotfoundComponent,
    NotificationComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    Ng2SearchPipeModule
  ],
  
  providers: [
    VolunteersignupService,
     PaymentService,
    PostSeriveService],
  bootstrap: [AppComponent]
})
export class AppModule {}
