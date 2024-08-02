import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoryComponent } from "./story.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";

describe('AppComponent',()=>{
    let component:StoryComponent;
    let fixture:ComponentFixture<StoryComponent>
    beforeEach(async()=>{
        TestBed.configureTestingModule(
            {imports:[RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule]}
        ).compileComponents();
        fixture=TestBed.createComponent(StoryComponent);
        component=fixture.componentInstance;
        localStorage.setItem('story',JSON.stringify({id:1,title:'title',url:'url'}));
        fixture.detectChanges();
    });
    it('should create component',()=>{
        expect(component).toBeTruthy();
    })
    it('should set  story peroperty on init',()=>{
        
        component.ngOnInit();
    })

    
})