import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Signup } from "../class/signup";
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { Like } from '../class/like';
import { Comment } from '../class/comment'
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Follow } from '../class/follow';
import * as $ from 'jquery'
import { AdminService } from '../services/admin.service';
import { Charity } from '../class/charity';
import { DonationMaterial } from '../class/donation-material';
declare var require: any;

@Component({
  selector: "app-charityhome",
  templateUrl: "./charityhome.component.html",
  styleUrls: ["./charityhome.component.css"]
})
export class CharityhomeComponent implements OnInit {
  Material : DonationMaterial[]=[];

  createpost;
  postlikes;
  likeNo;
  public email;
  charities: unknown;
  postPostedBy: any;
  profileimageee="";
  profileimag=""
  commentByVolunteer = new Signup("", "", "", "", "", "", "", "");
  commentByCharity =   new Signup("", "", "", "", "", "", "", "");
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService: CharityService,
    private volunteerService: VolunteersignupService,
    private _AdminService : AdminService

  ) { }
  depend=""
  public code;
  AllLikes;
  IDpost: string;
  likesPostedby: any;
  commentpost;
  public ID;
  public postedByVolunteer;
  public Allpost;
  public postedByCharity;
  public iscomment = false;
  public following=false;
  public isfollow = false;
  public isnotify = false;

  public Following = {}
  public islike = false;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  public newPost = new Post('', '', "", [], [], null)
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public followClass = new Follow("", "")
public charityclass =new Charity('','','','','','','','',[],[])
  randomNumber = Math.floor(Math.random() * 10) + 1;

  searchText;
  listvolunteersearch;
  listcharitysearch;
  // slsText;
  displaydiv = false;
  auth=true;
  cahritysearchlist:boolean = false;
  Voluntersearchlist:boolean = false;
  
  Voluntersearch(){
    this.Voluntersearchlist = true;
    this.cahritysearchlist = false;

  }
  notifyshow(){
    if(this.isnotify==false  ){

      this.isnotify=true
    }
    else{
      this.isnotify=false
    }

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
charitydetails:Signup[]= [];
  ngOnInit() {
    // this._LoginService.charitydetails(this.code).subscribe(
    //   data => {
    //     this.charitydetaile = data;

    //   }
    // );

    $("#addfolloing").on('click',function(){
      $(this).closest("#charitysuggest").remove();
     })

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.charitydetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
    //     this.charityService.listmaterial(this.charitydetaile.name).subscribe(
    //       data => {
    //         console.log(this.charitydetaile.name)
    //         this.Material = data as  DonationMaterial[];
    //         console.log(this.Material )
           
    
    //       },
    //       error => {
    
    // console.log(error)      }
    //     )
    this.postSerives.getmaterialb(this.charitydetaile.name)
    this.postSerives.getmaterial().subscribe(  
              data => {
                console.log("hi")
              console.log(this.charitydetaile.name)
              this.Material = data as  DonationMaterial[];
              console.log(this.Material )
             
      
            },
            error => {
      
      console.log(error)      })
    
      },
      error => {
        this.router.navigate(["login"]);
      }
    );

    // posts & posted by
    this.postSerives.getpost().subscribe(data=>{
      // console.log(data)
      this.Allpost=data
    
      for (let post of this.Allpost) {
        // console.log(post.postedby)
        this.postPostedBy = post.postedby

        this.postSerives.findUser(this.postPostedBy)
        // console.log(this.postPostedBy)

        this.postSerives.volunteer().subscribe(volunteer => {
          this.postedByVolunteer = volunteer
          // console.log(this.postedByVolunteer)
        })
      
        this.postSerives.charity().subscribe(charity => {
          this.postedByCharity = charity
          // console.log(this.postedByCharity)
        })
        

      }

    });

    this.postSerives.getallcharity();

    this.postSerives.charities().subscribe(charities => {
      // console.log(charities)
      this.charities = charities


    });



  this.charityService.listCharity().subscribe(data=>{
    this.listcharitysearch=data
  });
  this.volunteerService.listvolunteer().subscribe(data=>{
    this.listvolunteersearch=data
  });

  this._AdminService.getcharities().subscribe(
    data  => {
      this.charitydetails = data as Signup[];
      //  console.log(data)

      
    

    },

    error => {

    }
  )
  }

  refresh() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        // console.log(data)
        this.ID = this.code.slice(0, 9);



      },
      error => {
        this.router.navigate(["login"]);
      }
    );
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  onSubmit() {
  
    this.newPost.postedby = this.code
    this.postSerives.newpost(this.newPost)
      this.postSerives.getpost().subscribe(data => {
        this.Allpost = data
      })

    this.newPost.title = "",
      this.newPost.content = ""

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
      
       this.commentByVolunteer = volunteer as Signup
        // console.log(this.commentByVolunteer)
        // console.log(this.commentByVolunteer.name);
        
      })
    
      this.postSerives.charity().subscribe(charity => {
      
        this.commentByCharity = charity as Signup
        // console.log(this.commentByCharity)
        // console.log(this.commentByCharity.name);
        
      })


    }
    
  })
}
  commentPostedBy(commentPostedBy: any) {
    throw new Error("Method not implemented.");
  }
 async commentByC(comment,commentByC){
  console.log(comment === commentByC)
  if(comment === commentByC||commentByC != undefined){
   return true
  }
}


commentByV(comment,commentByV){
  
  if(comment === commentByV){

    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.displaycomment(this.IDpost)
    this.postSerives.allcomment().subscribe(allcomment => {
      this.commentpost = allcomment
    })
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

  if (p== c) {
    return true
  }
}


  like(post) {
    
    this.likeNo=true
    this.likeclass.postedby = this.code
    this.IDpost = post._id
    this.likeclass.post = this.IDpost

    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
    

      this.AllLikes = likes

      for(let like of this.AllLikes){
        
        if(like.post === this.IDpost && like.postedby === this.code){
          this.postSerives.removelike(this.likeclass)
          this.postSerives.postlikeslast().subscribe(likes=>{
           
            
          })
        }
      }
    })
    this.postSerives.like(this.likeclass)

    // this.postSerives.getThisLike().subscribe(like=>{
    //   console.log(like);
 
    // })
// post like
    this.postSerives.postlikes(this.likeclass.post)
    this.postSerives.getLikes().subscribe(likes => {
      console.log(likes)
      this.AllLikes = likes
     console.log( this.postlikes);
     this.postlikes=this.AllLikes.length
    });


  }


  // follow
  
  follow(charity) {

    document.getElementById(charity._id).style.display = "none";

    if(this.code === charity._id){
      alert("you can't follow yourself")
      return;
    }
   
    
    
    if(this.charityclass.following.length === 0){
      this.followClass.follower = this.code
    this.followClass.following = charity._id
      this.postSerives.follow(this.followClass)
    
    }
    
else{
    this.followClass.follower = this.code
    this.followClass.following = charity._id
 

  
   
    for(let onefollowing of this.charityclass.following){
      if(onefollowing !== this.followClass.following){
        this.postSerives.follow(this.followClass)
       
      }
      else if(onefollowing == this.followClass.following){
        alert("you are already follow this charity")
      }
     
      
    }
       

   }
    
  }

  Folllowing(charityFollowing) {
  
    
    this.router.navigate(["/following",charityFollowing._id])
    this.following=true;
   
  };


  postedByvolunteer(postBY,volunteerID){
    if(postBY === volunteerID ){
      return true
    }
  };

  postedBycharity(postedBY,charityID){
    if(postedBY === charityID){
      return true
    }
  }




  charityProfile(charity) {
    this.router.navigate(['/charity/account/_id', charity])
  }

  govolunteer(volunteer) {
    this.router.navigate(['home/volunteer/' + volunteer._id + '/volunteer/account']);

  }
  gocharity(charity) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
  
    this.router.navigate(['home/charity/' + charity._id + '/charity/account']);
  }
  gomaterial(donatem){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
  
    this.router.navigate(['home/charity/' + donatem._id + '/notification']);

  }
}
