import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    // Check initial status
    this.authService.checkAuthStatus();
  }

  logout() {
    if (confirm("Are you sure ?")) {
      this.authService.logout();
      this.toastr.warning("Your Logout Successfully!")
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    }
  }
}
