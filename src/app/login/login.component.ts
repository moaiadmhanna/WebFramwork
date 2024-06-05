import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
/* Your component-specific styles */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,HttpClientModule],
})
export class LoginComponent {
  constructor(private http: HttpClient,private _snackBar: MatSnackBar,private router: Router) {}
  emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required]);
  hide = true;
  openSnackBar(message: string, action: string, cssClass : string) {
    let snackBarRef = this._snackBar.open(message, action,{
      duration: 1000,
      verticalPosition: 'top',
      panelClass: cssClass
    });
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }
  onSubmit(){
    if (this.emailFormControl.valid && this.passwordFormControl.valid){
        const signInData = {
          email : this.emailFormControl.value,
          password : this.passwordFormControl.value
        }
        this.http.post('http://localhost:3000/session', signInData).subscribe(
          response => {
            this.router.navigate(["./startSite"])
          },
          error => {
            this.openSnackBar('Login Failed','dismiss','custom-snackbar-error');
          })
          
    }
    else{
      alert("You must enter the login credentials");
    }
  };
  hidePassword(event: Event) {
    this.hide = !this.hide;
  }
}


