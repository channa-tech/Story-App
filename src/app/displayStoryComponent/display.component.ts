import { CommonModule } from '@angular/common';
import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Story } from '../../Models/Story';
import { Pagination } from '../paginationComponent/pagination.component'

@Component({
  selector: 'display-story',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,Pagination],
  templateUrl: './display.html',
  styleUrl: './display.css'
})
export class DisplayComponent implements OnInit,OnChanges{
   
   @Input()data!:Story[];
   @Input() showSpin:boolean=true;
    pageData:Story[]=[];
    pageSizeOptions:number[]=[10,20,30,40,50];
    pageNumber:number=0;
    pageSize:number=10;
    constructor() {
    }
    ngOnChanges(changes: SimpleChanges): void {
      if(!changes['data'])
      this.setData();
    }
    
    ngOnInit(): void {
    }

    public onPageDataChange(val:Story[]){
        this.pageData=val;
    }
    showSpinner():boolean{
      return this.showSpin;
    }

    setData(){
      this.pageData=  this.data.slice(this.pageNumber*this.pageSize,(this.pageNumber*this.pageSize)+this.pageSize)
    }
    
  
   
    
    
   

}