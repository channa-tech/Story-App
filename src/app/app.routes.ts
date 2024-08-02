import { Routes } from '@angular/router';
import { AppComponent } from './appComponent/app.component';
import { StoryComponent } from './storyComponent/story.component';
import { DisplayComponent } from './displayStoryComponent/display.component';
import { flush } from '@angular/core/testing';

export const routes: Routes = [
    
    { path: 'item-details', component: StoryComponent },
    {path:'list',component:DisplayComponent},
    {path:'',redirectTo:'list',pathMatch:'full'}
  ];
