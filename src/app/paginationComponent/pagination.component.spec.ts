import { CommonModule } from "@angular/common"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Pagination } from "./pagination.component"
import { Story } from "../../Models/Story"
import { EventEmitter } from "@angular/core"


describe('Pagination',()=>{
    let fixure:ComponentFixture<Pagination>
    let component:Pagination
    let dropdownFormctrl: FormControl=new FormControl(10);
    let pageSizeOptions = [7, 10, 12, 20, 30, 40, 50];
    let data: Story[]=[{id:1,title:'title1',url:'url1'},
        {id:2,title:'title2',url:'url2'},
        {id:3,title:'title3',url:'url3'},
        {id:4,title:'title4',url:'url4'},
        {id:5,title:'title5',url:'url5'}
      ];
    let pageData = new EventEmitter<Story[]>();
    let pageNumber: number = 0;
    let pageSize: number = 10;
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[CommonModule,FormsModule,ReactiveFormsModule]
        }).compileComponents();
        fixure=TestBed.createComponent(Pagination);
        component=fixure.componentInstance;
        component.data=data;
        component.pageNumber=pageNumber;
        component.pageSize=pageSize;
        component.pageSizeOptions=pageSizeOptions;
        fixure.detectChanges();
    });
   
    it('when click next, page number should be incremented by 1',()=>{
        let val=pageNumber;
        component.next();
        expect(val+1).toBe(component.pageNumber);
    })
    it('when click prev, page number should be decremented by 1',()=>{
        pageNumber=4;
        component.pageNumber=pageNumber;
        let val=pageNumber;
        component.prev();
        expect(val-1).toBe(component.pageNumber);
    })
    it('when click prev, page number cannot be set to negative',()=>{
        component.prev();
        component.prev();
        component.prev();
        expect(component.pageNumber).toBeGreaterThanOrEqual(0);
    })

    it('should return correct page start size for a given data, pagesize and pageNumber',()=>{
        component.pageNumber=3;
        component.pageSize=5;
       let val= component.getStartPage();
       expect(val).toBe(16);
    })
    it('should return 1 as page start size for a  pageNumber 0',()=>{
        component.pageNumber=0;
        component.pageSize=5;
       let val= component.getStartPage();
       expect(val).toBe(1);
    })

    it('should return correct page end size for a given data, pagesize and pageNumber',()=>{
        component.pageNumber=1;
        component.pageSize=2;
        component.data=data;
       let val= component.getEndPage();
       expect(val).toBe(4);
    })
    it('should return page end size max to data length',()=>{
        component.pageNumber=1;
        component.pageSize=3;
        component.data=data;
       let val= component.getEndPage();
       expect(val).toBe(data.length);
    })
    it('dropdown select assigns pagesize',()=>{
        component.dropdownFormctrl=dropdownFormctrl;
        component.ngOnInit();
        component.dropdownFormctrl.setValue(5);
        fixure.detectChanges();
        expect(5).toEqual(component.pageSize);
    })
})