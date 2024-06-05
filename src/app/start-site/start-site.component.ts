import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-site',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule,CommonModule,HttpClientModule],
  templateUrl: './start-site.component.html',
  styleUrl: './start-site.component.scss'
})
export class StartSiteComponent {
  constructor(public dialog: MatDialog, private http : HttpClient,private router: Router) {}
  showScores = false;
  highscoreList = true;
  scores : any = [];
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.getScores();
    });
  }
  toggleScores() {
    this.showScores = !this.showScores;
    this.getScores();
  }
  getScores(){
    this.http.get("http://localhost:3000/highscores").subscribe(
      (response : any) => {
        this.scores = response.score;
      }
    )
  }
  logout(){
    let authToken : any = localStorage.getItem("authToken");
    console.log(authToken);
    this.http.delete('http://localhost:3000/session',authToken).subscribe(
      (response : any) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      },
      (error : any) => {
        console.log(error.message);
      }
    )
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl:"./AddScore.html",
  standalone: true,
  imports: [FormsModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,HttpClientModule],
})
export class DialogElementsExampleDialog {
  constructor(private http : HttpClient,public dialogRef: MatDialogRef<DialogElementsExampleDialog>){}
  usernameFormControl = new FormControl("",[Validators.required]);
  scoreFormControl = new FormControl("",[Validators.required]);
  onSubmit(){
    let highscore = {
      username: this.usernameFormControl.value,
      score : this.scoreFormControl.value
    }
    this.http.post('http://localhost:3000/highscores',highscore).subscribe(
      (response : any) => {
        console.log(response.message);
        this.dialogRef.close();
      },
      (error : any) => {
        console.log(error.message);
      }
    )
  }
}