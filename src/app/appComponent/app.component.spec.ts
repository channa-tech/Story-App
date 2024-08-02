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
describe('AppComponent',()=>{
    let component:AppComponent;
    let fixture:ComponentFixture<AppComponent>
    let httpController: HttpTestingController;
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports:[RouterOutlet,HttpClientTestingModule,CommonModule,FormsModule,DisplayComponent,ReactiveFormsModule]
            
        }).compileComponents();
        httpController = TestBed.inject(HttpTestingController);
        fixture=TestBed.createComponent(AppComponent);
        component=fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create component',()=>{
        expect(component).toBeTruthy();
    })
})