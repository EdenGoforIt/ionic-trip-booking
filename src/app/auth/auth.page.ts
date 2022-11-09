import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;

  isLoading = false;
  isAuthenticated = false;
  isLogin = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    console.log('form', this.form);
  }
  onLogin() {
    this.authService.login();
    // this.isLoading = true;
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in....',
      })
      .then((loadingElement) => {
        loadingElement.present();
        setTimeout(() => {
          // this.isLoading = false;
          loadingElement.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 500);
      });
  }

  onSubmit(event: NgForm) {
    console.log('form', this.form);

    console.log('event', event);
    this.onLogin();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
