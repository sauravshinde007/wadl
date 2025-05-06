import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private router: Router){}

    login(){
      const storedUser = JSON.parse(localStorage.getItem("user") || "[]");
      if(storedUser.email === this.email && storedUser.password === this.password){
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/profile']);
      }else{
        alert('Invalid Credentials');
      }
    }
}
