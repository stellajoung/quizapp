import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  async loginWithEmail() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.showSuccessMessage('Successfully logged in!');
      this.router.navigate(['/dashboard']); // Redirect to Dashboard
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async loginWithGoogle() {
    try {
      await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      this.showSuccessMessage('Successfully logged in with Google!');
      console.log('Successfully logged in with Google!');
      this.router.navigate(['/dashboard']); // Redirect to Dashboard
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
