import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    user = {
      name: '',
      email: '',
      password: ''
    };

    constructor(private router: Router){}

    register(){
      localStorage.setItem('user', JSON.stringify(this.user));
      alert("Registered User");
      this.router.navigate(['/login']);
    }
}
