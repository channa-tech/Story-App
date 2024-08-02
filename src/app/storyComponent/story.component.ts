import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Story } from '../../Models/Story';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'story',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './story.html'
})
export class StoryComponent implements OnInit{
story!:Story;
constructor() {
  
  console.log('ctor');
}

ngOnInit(): void {
    
    this.story= JSON.parse(localStorage.getItem('story') as string);
  }
  
}
