import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { CharityAccountComponent } from "./charity-account/charity-account/charity-account.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { SignupComponent } from "./signup/signup.component";
import { DonationComponent } from "./donation/donation.component";
import { CongrateComponent } from "./congrate/congrate.component";
import { GuardService } from "./services/guard.service";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { CharityhomeComponent } from "./charityhome/charityhome.component";
import { FollowingComponent } from './following/following.component';
import { AdminCharityComponent } from './admin-charity/admin-charity.component';
import { AdminVolunteerComponent } from './admin-volunteer/admin-volunteer.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { PostsadminComponent } from './postsadmin/postsadmin.component';
import { CheckauthService } from './services/checkauth.service';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { ResetComponent } from './reset/reset.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotificationComponent} from './notification/notification.component'
const routes: Routes = [
  { path: "", component: HomeregisterationComponent },
  { path: "login", component: LoginComponent,    
  canActivate: [CheckauthService]
  },
  { path: "home", component: HomeregisterationComponent },
  { path: "about", component: AboutusComponent },
  { path: "howitwork", component: HowitworkComponent },
  { path: "contact", component: ContactComponent },
  {
    path: "home/volunteer/:_id",
    component: HomeComponent,
    canActivate: [GuardService]
  },
  {
    path: "home/volunteer/:_id/volunteer/account",
    component: VolunteerAccountComponent,
    canActivate: [GuardService]
  },
  {
    path: "home/charity/:_id/charity/account",
    component: CharityAccountComponent,
    canActivate: [GuardService]
  },
  { path: "donation", component: DonationComponent },
  { path: "signup", component: SignupComponent },
  { path: "done", component: CongrateComponent },
  {
    path:"home/charity/:_id/notification",
    component:NotificationComponent,
    canActivate: [GuardService]

  },
  {
    path: "admin/:_id",
    component: DashBoardComponent,
    canActivate: [GuardService],
    children: [
      {
        path: "admin/charity",
        component: AdminCharityComponent,
      },
      {
        path: "admin/volunteer",
        component: AdminVolunteerComponent,
      },
      {
        path: "admin/add",
        component: AddadminComponent,
      },
      {
        path: "admin/posts",
        component: PostsadminComponent,
      }
    ]
  },
  {
    path: "resetpassword",
    component: ForgetpassComponent,
  },
  {
    path: "reset-password",
    component: ResetComponent,
    canActivate: [GuardService]
  },
  {
    path: "home/charity/:_id",
    component: CharityhomeComponent,
    canActivate: [GuardService]
  },
  {path:"charity/account/_id",component:CharityAccountComponent},
  {path:"charity/home/:_id",component:CharityhomeComponent},
  {path:"following/:_id",component:FollowingComponent},
  {path:"**",component:NotfoundComponent}
];

@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
