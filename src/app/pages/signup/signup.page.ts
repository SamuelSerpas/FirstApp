import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  signUp(){
  this.authService.signup(this.user)
    .subscribe(
      res => {
      console.log(res)
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home'])
    },
      err => console.log(err)
    )
  }
}
