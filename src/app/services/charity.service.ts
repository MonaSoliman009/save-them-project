import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Signup } from "../class/signup";
import { Needs } from "../class/needs"
import { Observable } from 'rxjs';
import { Provides } from '../class/provides';
import { Changeimg } from '../class/changeimg';
@Injectable({
  providedIn: "root"
})
export class CharityService {
  constructor(private http: HttpClient) {}

  signUpCharity(signup: Signup) {
    return this.http.post(
      "http://localhost:3000/savethem/charity/signup",
      signup
    );
  }
  listCharity(){
    return this.http.get('http://localhost:3000/search/listcharity')
  }
  addneed(need:Needs,_id){
    return this.http.post(
      "http://localhost:3000/savethem/needs/add/"+_id,
      need)
  }
  addprovide(provide:Provides,_id){
    return this.http.post(
      "http://localhost:3000/savethem/provides/add/"+_id,
      provide)
  }
  listneed(_id){
    return this.http.get<any>(
      "http://localhost:3000/savethem/needs/list/"+_id)
  }
  listprovide(_id){
    return this.http.get<any>(
      "http://localhost:3000/savethem/provides/list/"+_id)
  }
  listmaterial(name){
    return this.http.get<any>(
      "http://localhost:3000/donate/material/list/"+name)
  }
  listmaterialitem(_id){
    return this.http.get<any>(
      "http://localhost:3000/donate/material/listitem/"+_id)

  }
  deleteneed(_id){
    return this.http.delete("http://localhost:3000/savethem/needs/delete/"+_id)
  }
  deleteprovide(_id){
    return this.http.delete("http://localhost:3000/savethem/provides/delete/"+_id)
  }
  updateneed(need:Needs,_id){
    return this.http.post(
      "http://localhost:3000/savethem/needs/update/"+_id,
      need)
  }
  updateprovide(provide:Provides,_id){
    return this.http.post(
      "http://localhost:3000/savethem/provides/update/"+_id,
      provide)
  }
  changeimg(img: Changeimg,_id){

    return this.http.post(
      "http://localhost:3000/savethem/charity/account/img/"+_id,
      img)

  }
}
