import { CommonModule } from '@angular/common';
import { HttpClient,  HttpClientModule, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Story } from '../../Models/Story';
import { DisplayComponent } from '../displayStoryComponent/display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  /**
   *
   */
  constructor() {
    
  }
  
  
}
