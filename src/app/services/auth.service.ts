import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendHost : string="http://localhost:8085";
  roles : any;
  username : any;
  accessToken! : string;
  isAuthenticated : boolean = false;

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: object, private router:Router) { }

  public login(username : string, password : string){
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams().set("username",username).set("password",password);
    return this.http.post(this.backendHost+"/auth/login",params,options)
  }

  loadProfile(value: any) {
    this.accessToken = value['access-token'];
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem('accessToken', this.accessToken);
    let decodedJwt:any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    this.isAuthenticated = true;
  }

  logout() {
    this.accessToken="";
    this.username=undefined;
    this.roles=undefined;
    if (isPlatformBrowser(this.platformId))
      localStorage.removeItem("accessToken")
    this.isAuthenticated = false;
    this.router.navigateByUrl("/login")
  }

  loadAccessTokenFromLocalStorage() {
    const currentPath = this.router.url;
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('accessToken');
      if (token) {
        this.loadProfile({ 'access-token': token });
        if(currentPath.toString()==='/login')
          this.router.navigateByUrl("/admin")
      }
    }
  }

  getRoles(){
    let roleArr = this.roles.toString().split(" ");
    return roleArr;
  }
}
