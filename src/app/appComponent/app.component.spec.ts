import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { CommonModule } from "@angular/common";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DisplayComponent } from "../displayStoryComponent/display.component";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "../../Services/httpService";
import { Observable, of } from "rxjs";
import { Story } from "../../Models/Story";
export class MockService{
    getStories():Observable<Story[]>{
        return of([{id:1,title:'title',url:'url1'}]);
    }
    search(query:string):Observable<Story[]>{
        return of([{id:1,title:query,url:'url1'}]);
    }
}
describe('AppComponent',()=>{
    let component:AppComponent;
    let fixture:ComponentFixture<AppComponent>
    let httpController: HttpTestingController;
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports:[RouterOutlet,HttpClientTestingModule,CommonModule,FormsModule,DisplayComponent,ReactiveFormsModule],
            providers:[{provide:HttpService,useClass:MockService}]
        }).compileComponents();
        TestBed.overrideComponent(AppComponent, {
            set: {
              providers: [
                { provide: HttpService, useClass: MockService }
              ]
            }
          });
        httpController = TestBed.inject(HttpTestingController);
        fixture=TestBed.createComponent(AppComponent);
        component=fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should initialise data',()=>{
        component.ngOnInit();
        fixture.detectChanges();
       expect(component.data.length).toBeGreaterThan(0);
       expect(component.data).toEqual([{id:1,title:'title',url:'url1'}]);
    })
    it('should create component',()=>{
        expect(component).toBeTruthy();
    })

    it('should return stories with search title',()=>{
        const ctrol=component.ctrl;
        ctrol.setValue("Search");
        (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
        fixture.detectChanges();
        expect(component.data.every(v=>v.title.includes('Search'))).toBe(true);

    })
})