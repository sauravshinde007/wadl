import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    user: any;

    constructor(private router: Router){
      const userData = localStorage.getItem("user");
      if(!userData){
        this.router.navigate(["/login"]);
      }else[
        this.user = JSON.parse(userData)
      ]
    }

    logout(){
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/login']);
    }
}
