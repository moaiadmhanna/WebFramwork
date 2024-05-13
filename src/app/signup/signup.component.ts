import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule,MatButtonModule,MatIconModule],
})
export class SignupComponent {
  emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required,Validators.pattern(".{8,}")]);
  confirmPasswordFormControl = new FormControl("",[Validators.required,Validators.pattern(".{8,}")]);
  addressStreetFormControl = new FormControl("",[Validators.required]);
  addressCityFormControl = new FormControl("",[Validators.required]);
  addressPostCodeFormControl = new FormControl("",[Validators.required]);
  hidePassword = true;
  hideConfirm = true;
  onSubmit(){
    if(this.emailFormControl.valid 
      && this.passwordFormControl.valid && this.confirmPasswordFormControl.valid 
      && this.addressStreetFormControl.valid && this.addressCityFormControl.valid && this.addressPostCodeFormControl.valid)
      {
        if(this.passwordFormControl.value == this.confirmPasswordFormControl.value) {
          console.log("Success.");
        }
        else{
          alert("Password and Confirm Password must be the same");
        }
      }
  };
  hidePasswordEvent(event: Event) {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmEvent(event: Event) {
    event.stopPropagation();
    this.hideConfirm = !this.hideConfirm;
  }
}
