import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agree: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {}

  async registerWithEmail() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('users').doc(userCredential.user.uid).set({
        name,
        email,
        uid: userCredential.user.uid
      });
      this.showSuccessMessage();
      this.router.navigate(['/dashboard']); // Redirect to Dashboard
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async registerWithGoogle() {
    try {
      const userCredential = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      const userDoc = this.firestore.collection('users').doc(userCredential.user.uid);
      const userSnapshot = await userDoc.get().toPromise();

      if (!userSnapshot.exists) {
        await userDoc.set({
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid
        });
      }
      this.showSuccessMessage();
      this.router.navigate(['/dashboard']); // Redirect to Dashboard
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  private showSuccessMessage() {
    this.snackBar.open('Congratulations! You have successfully registered.', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
