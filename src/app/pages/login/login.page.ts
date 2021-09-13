import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn(email: any, password: any) {
    this.authService.signIn(email.value, password.value).then(res => {
      // if (!this.authService.userData.emailVerified) {
      //   window.alert('Email is not verified')
      //   return false;
      // }
    }).catch((err) => {
      window.alert(err.message)
    })
  }
}
