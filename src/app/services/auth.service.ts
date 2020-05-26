import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { ɵangular_packages_router_router_h } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api'
  
  constructor(private http: HttpClient) { }

  signup(user){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signin(user){
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn(){
  return !!localStorage.getItem('token');
  }
}
