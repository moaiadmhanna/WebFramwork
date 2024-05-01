import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
/* Your component-specific styles */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class LoginComponent {
  emailFormControl = new FormControl("",[Validators.required, Validators.email]);
  passwordFormControl = new FormControl("",[Validators.required]);
  confirmPasswordFormControl = new FormControl("",[Validators.required]);
}


