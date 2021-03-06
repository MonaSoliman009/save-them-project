import { Component, OnInit } from "@angular/core";
declare var require: any;
import { Volunteerdetails } from "../class/volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { Like } from '../class/like';
import { Comment } from 'src/app/class/comment';
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Edit } from '../class/edit';
declare var require: any;
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Volunteer } from '../class/volunteer';
const URL = "http://localhost:3000/savethem/volunteer/signup";

@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "img"
  });
  imgprofile = require("../../assets/3.jpg");
  coverimmg=""
  imgnav = require("../../assets/1.jpg");
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "");
  volunteersignup = new Volunteer("", "", "", "", "", "", "","");

  public code;
  public iscomment = false;
  public islike = false;
  NameF =true;
  EditFName =false;
  lastname=true;
  editlname=false;
  phone=true;
  phoneEdit=false;
  Country=true
  countryedit=false
  public charityposts;
  public ID;
  IDpost: string;
  editpost: {}
  commentpost;
  edititle: any;
  AllLikes;
  postTitle;
  postContent;
  likesPostedby: any;
  public showcomment =false
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public newPost = new Post('', '', '', [], [],null);
  public editclass = new Edit("", "", "", "")
  commentByVolunteer
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  listvolunteersearch ;
  listcharitysearch ;
 
  IDpostdelete: any;
  profileimageee="";
  
  charitydetailchanged;
  volunteerdetailchanged;
  commentPostedBy;
  commentByVoluntee;
  commentByCharity;

 

// slsText;
displaydiv = false;
cahritysearchlist:boolean = false;
Voluntersearchlist:boolean = false;

Voluntersearch(){
  this.Voluntersearchlist = true;
  this.cahritysearchlist = false;

}
Charitysearch(){
  this.cahritysearchlist = true;
  this.Voluntersearchlist = false;

}
searcheng() {
  this.displaydiv = true;
}
searcheng2(){
  this.displaydiv=false;
}
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService

  ) {}
  fileselected = "";
  istrusted=false;
  refresh(){
  
    if(localStorage.getItem("name")=="volunteer"){

      this.router.navigate(["/home/volunteer/"+ localStorage.getItem("id")]);

    }
    else if(localStorage.getItem("name")=="charitiy"){

      this.router.navigate(["/home/charity/"+ localStorage.getItem("id")]);

    }
  }
  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {

    };
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
    this._LoginService.volunteerdetails(this.code).subscribe(
      data => {
        this.volunteerdetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.volunteerdetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
      },
      error => {
        this.router.navigate(["login"]);
      }
    );

    this.postSerives.getcharityid(this.code)

    this.postSerives.charityposts().subscribe(posts => {
      this.charityposts = posts
    })
     // subscribe search
     this.charityService.listCharity().subscribe(data=>{
      this.listcharitysearch=data
    });
    this.volunteerService.listvolunteer().subscribe(data=>{
      this.listvolunteersearch=data
    });
    if(localStorage.getItem("id")==this.code){

      this.istrusted=true;

    }
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  charityid() {
    this.postSerives.getcharityid(this.code)
  }

  onSubmit() {
    this.newPost.postedby = this.code
    this.postSerives.newpostfromACC(this.newPost),
      this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      this.charityposts=allpostcharity

    })
    this.newPost.title="",
    this.newPost.content=""
  }

  like() {
    document.getElementById("like").style.color = "#3B6D8C";
    this.likeclass.postedby = this.code
    this.IDpost = document.getElementById('postID').innerHTML
    this.likeclass.post = this.IDpost

    this.postSerives.like(this.likeclass)


  }

  showlike(){
    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      this.AllLikes=likes
      this.likesPostedby=document.getElementById("likepostedby")
      this.postSerives.getlikesPostedby(this.likesPostedby)
      this.islike=true
  })
  }
//   comment() {
//     this.iscomment = true;
//     this.showcomment=true

// this.IDpost = document.getElementById('postID').innerHTML
//     this.postSerives.displaycomment(this.IDpost)
//     this.postSerives.allcomment().subscribe(allcomment => {
//       console.log(allcomment)
//       this.commentpost = allcomment
//     })

    
// }

editbutton(post) {

  this.IDpost=post._id
  this.postTitle=post.title
  this.postContent=post.content
  
}

  edit() {
    // this.editclass.postID = this.IDpost
    this.newPost.postedby = this.code

    
    this.postSerives.edit(this.newPost,this.IDpost)

    this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      this.charityposts = allpostcharity

      this.editclass.title = "",
        this.editclass.content = ""


    })
  }
  deletebutton(post){
    this.IDpostdelete=post._id
  }
  delete() {

    // this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.delete(this.IDpostdelete)
    this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(posts => {
      this.charityposts = posts
    })
  }


  Comment(post) {
   
    this.IDpost = post._id
  this.postSerives.displaycomment(this.IDpost)
   this.postSerives.allcomment().subscribe(allcomment => {
    // console.log(allcomment)
    this.commentpost = allcomment

  for(let comment of this.commentpost){
      // console.log(comment.postedby)
      this.commentPostedBy = comment.postedby


   this.postSerives.findUser(this.commentPostedBy)
      // console.log(this.commentPostedBy)

       this.postSerives.volunteer().subscribe(volunteer => {
       this.commentByVolunteer = volunteer
        // console.log(this.commentByVolunteer)
        // console.log(this.commentByVolunteer.name);
        
      })
    
      this.postSerives.charity().subscribe(charity => {
        this.commentByCharity = charity
        // console.log(this.commentByCharity)
        console.log(this.commentByCharity.name);
        
      })


    }
    
  })
}
 async commentByC(comment,commentByC){
  console.log(this.commentByCharity)
  console.log(commentByC)
  if(comment === commentByC){
   return true
  }
}


commentByV(comment,commentByV){
if(comment === commentByV){
return true
}
}



sendcomment(comment,post) {
  
  this.commentclass.postedby = this.code
  this.IDpost = post._id
  this.commentclass.post = this.IDpost

  this.postSerives.comment(this.commentclass)

  this.IDpost = post._id
  this.postSerives.displaycomment(this.IDpost)
  this.postSerives.allcomment().subscribe(allcomment => {
    this.commentpost = allcomment
    
  })


  this.commentclass.text =''
 

}





commentt(p,c) {
  // console.log(p);
  // console.log(c);
  if (p== c) {
    return true
  }
}

  onfileselected(event) {
    this.fileselected = event.target.files[0].name;
    this.coverimmg= require("../../../server/upload/"+this.fileselected)

  }
  
  govolunteer(volunteer){
    this.router.navigate(['home/volunteer/'+volunteer._id+'/volunteer/account']);
    
  }
  gocharity(charity){
    this.router.navigate(['home/charity/'+charity._id+'/charity/account']);
  }
  // coverimg(){

  //   console.log(this.volunteersignup.coverimg);

  //   this.volunteerService.volunteersign(this.volunteersignup.coverimg).subscribe(
  //     response => {
  //       console.log("Success!", response);
  //     },

  //     error => {
  //       console.log("error", error);
        
  //     }
  //   );
  // }



  editfname(){
    this.NameF=false
    this.EditFName=true
 
   }

   editFname(change){
    this.code
    this.postSerives.changefname(this.code,change)
 
    this.EditFName =false
    this.NameF =true
 
    this.postSerives.changedvolunteer().subscribe(data=>{
      
    //  data=this.volunteerdetailchanged
    //   console.log(this.volunteerdetailchanged);
      
    })
   };


   Lname(){
    this.lastname=false,
    this.editlname=true
   }

   editLname(change){
    this.code
    this.postSerives.changeLname(this.code,change)
 
    this.editlname =false
    this.lastname =true
 
    this.postSerives.changedvolunteer().subscribe(data=>{
      
    
    })
  };
  
 
  editphone(){
    this.phone=false,
    this.phoneEdit=true
   }

   newphone(change){
    this.code
    this.postSerives.changePhoneVOL(this.code,change)
 
    this.phoneEdit =false
    this.phone =true
 
    this.postSerives.changedvolunteer().subscribe(data=>{
      
    
    })
  };

  country(){
    this.Country=false
    this.countryedit=true
  }
  
  Editcountry(change){
    this.code
    this.postSerives.changecountryVOL(this.code,change)
 
    this.countryedit =false
    this.Country =true
 
    this.postSerives.changedvolunteer().subscribe(data=>{
      
    
    })
  }
}
