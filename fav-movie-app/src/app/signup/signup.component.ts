import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string;
  email: string;
  password: string;

  constructor(private http: HttpClient) {}

  signUp() {
    if (this.name && this.email && this.password) {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.http.post('http://localhost:1111/users', userData).subscribe(
        (data) => {
          console.log('Sign up successful!', data);
          this.resetForm();
          alert("Signed up successfully!!");
        },
        (error) => {
          console.log('Error occurred during sign up:', error);
        }
      );
    } else {
      console.log('Please fill all fields before signing up.');
    }
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}
