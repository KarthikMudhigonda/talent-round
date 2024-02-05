import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.get<any[]>('http://localhost:1111/users').subscribe(
      (users) => {
        const matchedUser = users.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (matchedUser) {
          // console.log('Login successful!');
          sessionStorage.setItem('login', JSON.stringify(matchedUser));
          this.router.navigate(['movies-list']);
        } else {
          console.log('Invalid email or password.');
        }
      },
      (error) => {
        console.log('Error occurred during login:', error);
      }
    );
  }

  googleSignIn() {
    window.open('https://accounts.google.com', '_blank');
  }

  facebookSignIn() {
    window.open('https://www.facebook.com', '_blank');
  }

  cloudSignIn() {
    window.open('https://www.example.com', '_blank');
  }
}
