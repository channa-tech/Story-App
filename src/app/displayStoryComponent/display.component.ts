import { CommonModule } from '@angular/common';
import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Story } from '../../Models/Story';
import { Pagination } from '../paginationComponent/pagination.component'
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpService } from '../../Services/httpService';

@Component({
  selector: 'display-story',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule,Pagination],
  templateUrl: './display.html',
  styleUrl: './display.css'
})
export class DisplayComponent implements OnInit{
   
   
   
    pageData:Story[]=[];
    pageSizeOptions:number[]=[10,20,30,40,50];
    pageNumber:number=0;
    pageSize:number=10;
    data:Story[]=[];
    ctrl:FormControl=new FormControl('');
    constructor(private router: Router,private service:HttpService) {
    }
    spinner:boolean=true;
    ngOnInit(): void {
    
    this.service.getStories().subscribe(
      {
        next:(val)=>{
          this.data=val.filter(v=>v.url && v.url.trim()!=='');
          this.setData();
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
        this.data=val.filter(v=>v.url && v.url.trim()!=='');
        this.setData();
        this.spinner=false;
      },
      error:(er)=>{
        this.spinner=false;
      }
    });
  }
  
    
    
    

    public onPageDataChange(val:Story[]){
        this.pageData=val;
    }
    showSpinner():boolean{
      return this.spinner;
    }
   
  
    setData(){
      this.pageData=  this.data.slice(this.pageNumber*this.pageSize,(this.pageNumber*this.pageSize)+this.pageSize)
    }
    
  
   
    
    
   

}