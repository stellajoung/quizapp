import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-green', class: '' },
  { path: '/myquizzes', title: 'My Quizzes', icon: 'ni-planet text-red', class: '' },
  { path: '/createQuiz', title: 'Take quiz', icon: 'ni-single-copy-04 text-yellow', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public isCollapsed = true;
  public isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log('User authenticated:', this.isAuthenticated);
      this.updateMenuItems();
    });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  updateMenuItems() {
    console.log('Updating menu items:', this.isAuthenticated);

    if (this.isAuthenticated) {
      this.menuItems = [
        { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-green', class: '' },
        { path: '/myquizzes', title: 'My Quizzes', icon: 'ni-planet text-red', class: '' },
        { path: '/createQuiz', title: 'Take quiz', icon: 'ni-single-copy-04 text-yellow', class: '' },
        { path: '/logout', title: 'Sign out', icon: 'ni-user-run text-info', class: '' }
      ];
    } else {
      this.menuItems = [
        { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-green', class: '' },
        { path: '/myquizzes', title: 'My Quizzes', icon: 'ni-planet text-red', class: '' },
        { path: '/createQuiz', title: 'Take quiz', icon: 'ni-single-copy-04 text-yellow', class: '' },
        { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
        { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
      ];
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
