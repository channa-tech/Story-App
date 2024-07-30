import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Story } from '../../Models/Story';
@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './pagination.html'
})
export class Pagination implements OnInit, OnChanges{
    
    dropdownFormctrl: FormControl = new FormControl(10);
    @Input() pageSizeOptions: number[] = [7, 10, 12, 20, 30, 40, 50];
    @Input() data!: Story[];
    @Output() pageData = new EventEmitter<Story[]>();
    @Input() pageNumber: number = 0;
    @Input() pageSize: number = 10;

    ngOnInit(): void {
        this.dropdownFormctrl.valueChanges.subscribe({
            next: (val) => {
                this.pageSize = parseInt(val);
                this.setData();
            }
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"]!) {
            this.setData();
        }
    }
    
  
    getStartPage() {
        return this.pageNumber <= 0 ? 1 : (this.pageNumber * this.pageSize) + 1;
    }
    getEndPage() {
        return ((this.pageNumber * this.pageSize) + this.pageSize) > this.data.length ? this.data.length : ((this.pageNumber * this.pageSize) + this.pageSize);
    }
    setData() {
        this.pageNumber = 0;
        this.pageData.emit(this.data.slice(this.pageNumber * this.pageSize, (this.pageNumber * this.pageSize) + this.pageSize));
    }
    prev() {
        this.pageNumber--;
        if (this.pageNumber < 0) {
            this.pageNumber = 0;
        }
        this.pageData.emit(this.data.slice(this.pageNumber * this.pageSize, (this.pageNumber * this.pageSize) + this.pageSize));
    }
    next() {
        this.pageNumber++;
        this.pageData.emit(this.data.slice(this.pageNumber * this.pageSize, (this.pageNumber * this.pageSize) + this.pageSize));

    }
}