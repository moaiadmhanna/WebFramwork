import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
/* Your component-specific styles */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule],
})
export class LoginComponent {
  emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required]);
  hide = true;
  onSubmit(){
    if (this.emailFormControl.valid && this.passwordFormControl.valid){
      if(this.emailFormControl.value == "test@test.at" && this.passwordFormControl.value == "12345678"){
        console.log("Login successful.");
      }
      else{
        console.log("Login failed.");
      }
    }
    else{
      alert("You must enter the login credentials");
    }
  };
  hidePassword(event: Event) {
    event.stopPropagation();
    this.hide = !this.hide;
  }
}


