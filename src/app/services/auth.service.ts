import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  onLogin(data:any){
    return this.http.post('http://localhost:8082/api/Token',data,{responseType: 'text'})
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
}
