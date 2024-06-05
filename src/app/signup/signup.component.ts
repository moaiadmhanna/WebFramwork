import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

/** @title Simple form field */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule,MatButtonModule,MatIconModule,HttpClientModule],
})
export class SignupComponent {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required,Validators.pattern(".{8,}")]);
  confirmPasswordFormControl = new FormControl("",[Validators.required,Validators.pattern(".{8,}")]);
  addressStreetFormControl = new FormControl("",[Validators.required]);
  addressCityFormControl = new FormControl("",[Validators.required]);
  addressPostCodeFormControl = new FormControl("",[Validators.required]);
  hidePassword = true;
  hideConfirm = true;
  canBesubmited = true;
  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action,{
      verticalPosition: 'top',
    });
    this.canBesubmited = false;
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }
  onSubmit(){
    if(this.emailFormControl.valid 
      && this.passwordFormControl.valid && this.confirmPasswordFormControl.valid 
      && this.addressStreetFormControl.valid && this.addressCityFormControl.valid && this.addressPostCodeFormControl.valid)
      {
        if(this.passwordFormControl.value == this.confirmPasswordFormControl.value) {
          const signUpData = {
            email : this.emailFormControl.value,
            password : this.passwordFormControl.value,
            street: this.addressStreetFormControl.value,
            city: this.addressCityFormControl.value,
            postCode: this.addressPostCodeFormControl.value,
          }
          this.http.post('http://localhost:3000/users', signUpData).subscribe(
          (response: any) => {
            this.openSnackBar(response.message, "dismiss");
            if (response.token) {
              localStorage.setItem('authToken', response.token);
            }
          },
          (error : any ) => {
            this.openSnackBar(error.error.message, "dismiss");
          })
        }
        else{
          alert("Password and Confirm Password must be the same");
        }
      }
  };
  hidePasswordEvent(event: Event) {
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmEvent(event: Event) {
    this.hideConfirm = !this.hideConfirm;
  }
}
