import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public userName: string = 'Guest'; // Default name
  public isUserLoggedIn: boolean = false; // Track login state
  public profileImage: string = 'assets/img/profiles/0.jpg'; // Default profile image

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.afAuth.authState.subscribe(user => {
      this.isUserLoggedIn = !!user;
      if (this.isUserLoggedIn) {
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((userData: any) => {
          this.userName = userData?.name || 'Guest';
          this.profileImage = this.getRandomProfileImage();
        });
      }
    });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'createQuiz';
  }

  private getRandomProfileImage(): string {
    const randomIndex = Math.floor(Math.random() * 9); // Random number between 0 and 8
    return `assets/img/profiles/${randomIndex}.jpg`;
  }
}
