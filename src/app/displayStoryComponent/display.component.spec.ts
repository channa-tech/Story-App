import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DisplayComponent } from "./display.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Pagination } from "../paginationComponent/pagination.component";
import { Story } from "../../Models/Story";
import { HtmlParser } from "@angular/compiler";
import { SimpleChange } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('DisplayComponent',()=>{
  let component:DisplayComponent;
  let fixture:ComponentFixture<DisplayComponent>
  let data:Story[]=[{id:1,title:'title1',url:'url1'},
    {id:2,title:'title2',url:'url2'},
    {id:3,title:'title3',url:'url3'},
    {id:4,title:'title4',url:'url4'},
    {id:5,title:'title5',url:'url5'}
  ]
  let pageSize=2;
  let pageNumber=0;
  let pageSizeOptions:number[]=[2,4,6,8];
  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[CommonModule,FormsModule,ReactiveFormsModule,Pagination]
    }).compileComponents();
    fixture=TestBed.createComponent(DisplayComponent);
    component=fixture.componentInstance;
    component.data=data;
    component.pageSize=pageSize;
    component.pageNumber=pageNumber;
    component.pageSizeOptions=pageSizeOptions
    fixture.detectChanges();
  })
  it('show spinner when page data is null',()=>{
    component.pageData=[];
    let val=component.showSpinner();
    expect(val).toBe(true);
  })
  it('hide spinner when page data is not null',()=>{
    component.pageData=[{id:1,title:"title",url:'url1'}];
    let val=component.showSpinner();
    expect(val).toBe(false);
  })
  it('should fire ngOnChanges',()=>{
    console.log(component);
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.data=[{id:1,title:"title",url:'url1'}];
    let changes={data:new SimpleChange(null,data,false)};
    component.ngOnChanges(changes);
    expect(component.ngOnChanges).toHaveBeenCalled();
  })
  it('should set pageData to pageSize',()=>{
    pageSize=2;
    pageNumber=0;
    component.data=data;
    component.pageSize=pageSize;
    component.pageNumber=pageNumber;
    component.setData();
   expect(component.pageData.length).toBe(pageSize);
  })
  it('should handle pageDataChange event',()=>{
    spyOn(component,'onPageDataChange').and.callThrough();
    component.setData();
    fixture.detectChanges();
    fixture.debugElement.query(By.directive(Pagination)).triggerEventHandler('pageData',[{id:1,title:'title',url:'url'}]);
    expect(component.onPageDataChange).toHaveBeenCalled();
    expect(component.pageData).toEqual([{id:1,title:'title',url:'url'}]);
  })
})