import { CommonModule } from '@angular/common';
import { HttpClient,  HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Story } from '../../Models/Story';
import { DisplayComponent } from '../displayStoryComponent/display.component';
import { HttpService } from '../../Services/httpService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule,FormsModule,DisplayComponent,ReactiveFormsModule],
  providers:[HttpClient,HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit   {
  /**
   *
   */
  constructor(private service:HttpService) {
    
  }
  spinner:boolean=true;
  ngOnInit(): void {
    this.service.getStories().subscribe(
      {
        next:(val)=>{
          this.data=val;
          this.spinner=false;
        },
        error:(er)=>{
          this.spinner=false;
        }
      }
    );
  }
  
  search(){
    this.spinner=true;
    this.service.search(this.ctrl.value).subscribe({
      next:(val)=>{
        this.data=val;
        this.spinner=false;
      },
      error:(er)=>{
        this.spinner=false;
       
      }
    });
  }
  data:Story[]=[];
  ctrl:FormControl=new FormControl('');
  
}
