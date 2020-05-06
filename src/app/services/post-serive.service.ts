import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Post } from '../class/post';
import { Observable, observable } from 'rxjs';
import { Emailcharity } from '../class/emailcharity';

@Injectable({
  providedIn: 'root'
})

export class PostSeriveService {
  private url="http://localhost:3000"
  private createPosturl ="http://localhost:3000/post/create";
  private getdetailsofcharity ="http://localhost:3000/post/author/"
  socket;
  constructor(
    private http:HttpClient
  ) 
  { 
    this.socket=io(this.url);
    this.socket.on("connect",()=>{
        console.log("connect")

        
      })
  }

newpostfromACC(charitypost){
  this.socket.emit("charitypost",charitypost )
}

// allCharityPost(){
//   let charityposts =new Observable(observer=>{
//     this.socket.on("allCharityPost",allpostcharity=>{
//       observer.next(allpostcharity)
//     })
//   })
//  return charityposts
// }

newpost(createpost)
{
  this.socket.emit("create post",createpost)
}
newmaterial(creatematerial){
  this.socket.emit("submit material",creatematerial)
}
getmaterial(){
let materials =new Observable(observer=>{
  this.socket.on("getmaterialbyname",material=>{
    observer.next(material)
  }) 
  })
  return materials

}
getnotification(){
  let notifications =new Observable(observer=>{
    this.socket.on("getnotification",notification=>{
      observer.next(notification)
    }) 
    })
    return notifications
  
  }
getmaterialb(name){
this.socket.emit("getmaterials",name)
}

getpost(){
  let Posts= new Observable(observer=>{
  //   this.socket.on(this.url);
    this.socket.on('allPost',allpost=>{
      observer.next(allpost)
  })
  })
  return Posts
}

getcharityid(id){
  this.socket.emit("charityID",id)
}
charityposts(){
  let charityposts =new Observable(observer=>{
        this.socket.on("allcharitypost",allpostcharity=>{
          observer.next(allpostcharity)
        })
      })
     return charityposts
}
delete(idpost){
  this.socket.emit("delete",idpost)
}
edit(editpost,postID){
  this.socket.emit("edit",editpost,postID)
}
getpostbyid(id){
  this.socket.emit("editpost",id)
}


// getpostwilledit(){
//   let postwilledit =new Observable(observer=>{
//   this.socket.on("postthatwilledit",post=>{
//     observer.next(post)
//   })
// })
// return postwilledit
// }
comment(comment){
   this.socket.emit("createcomment",comment) 
}



displaycomment(postid){
  this.socket.emit("displaycomment",postid)
}
allcomment(){
  let comments =new Observable(observer=>{
    this.socket.on("comments",comment=>{
      observer.next(comment)
    })
})
  return comments
}

like(like){
  this.socket.emit("like",like)
}

getThisLike(){
  let like =new Observable(observer=>{
    this.socket.on("getThisLike",like=>{
      observer.next(like)
    }) 
    })
    return like

}

postlikes(idpost){
this.socket.emit("ALLlikes",idpost)
}
removelike(like){
  this.socket.emit("removelike",like)
}

getLikes(){
  let likes =new Observable(observer=>{
  this.socket.on("getAllLikes",like=>{
    observer.next(like)
  }) 
  })
  return likes
}

postlikeslast(){
  let like =new Observable(observer=>{
    this.socket.on("getAllLikes",like=>{
      observer.next(like)
    }) 
    })
    return like
  }


getlikesPostedby(postedbyid){
  this.socket.emit("likesPostedBy",postedbyid)
}







getallcharity(){
this.socket.emit("allCharity")
}

charities(){
  let charities =new Observable(observer=>{
    this.socket.on("getCharities",charity=>{
      observer.next(charity)
    }) 
    })
    return charities
  
};

// follow
follow(followData){
  this.socket.emit("follow",followData)
}

getfollowing(idcharity){
  this.socket.emit("getfollowing",idcharity)
}

following(){

  let following =new Observable(observer=>{
    this.socket.on("following",follow=>{
      observer.next(follow)
    }) 
    })
    return following
};

removefollow(idFollowing,charityID){
  this.socket.emit("remove",idFollowing,charityID) 
}

charityAfterRemove(){

  let charityAfterremove =new Observable(observer=>{
    this.socket.on("following",charity=>{
      observer.next(charity)
    }) 
    })
    return charityAfterremove
}


//home
function(){
  
}
findUser(id){
  this.socket.emit("findUser",id)
}

volunteer(){
  let volunteer =new Observable(observer=>{
  this.socket.on("isVolunteer",volunteer=>{
    observer.next(volunteer)
  }) 
})
  return volunteer
};


charity(){

  let charity =new Observable(observer=>{
    this.socket.on("ischarity",charity=>{
      observer.next(charity)
    }) 
  })
    return charity
  };


  findcharity(id){
    this.socket.emit("findcharity",id)
  };

  getcharitybyID(){

 let charity =new Observable(observer=>{
    this.socket.on("getcharitybyID",charity=>{
      observer.next(charity)
    }) 
  })
    return charity
  };


  // setting

  changename(charityID,name){
    this.socket.emit("changeName",charityID,name)
  }

  changeAdrress(charityID,address){
    this.socket.emit("changeAdrress",charityID,address)

  }

  changedphone(charityID,phone){
    this.socket.emit("changePhone",charityID,phone)
  }
  
  changeabout(charityID,about){
    this.socket.emit("changePhone",charityID,about)
  }

  changecountry(charityID,country){
    this.socket.emit("changecountry",charityID,country)

  }

  changefname(volunteerid,Fname){
    this.socket.emit("changefname",volunteerid,Fname)
  }

  changeLname(volunteerid,Lname){
    this.socket.emit("changelname",volunteerid,Lname)
  }

  changePhoneVOL(volunteerid,phone){
    this.socket.emit("changePhoneVOL",volunteerid,phone)
  }

  changecountryVOL(volunteerid,country){
    this.socket.emit("changeCountryVOL",volunteerid,country)
  }
changed(){

  let newcharity =new Observable(observer=>{
    this.socket.on("changed",charity=>{
      observer.next(charity)
    }) 
  })
    return newcharity
}

changedvolunteer(){

  let newvolunteer =new Observable(observer=>{
    this.socket.on("changedvolunteer",volunteer=>{
      observer.next(volunteer)
    }) 
  })
    return newvolunteer
}

}
