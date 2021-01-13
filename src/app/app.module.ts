import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {EditorFieldComponent} from './editor-field/editor-field.component';
import {MentionModule} from 'angular-mentions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    EditorFieldComponent,
  ],
  imports: [
    BrowserModule,
    MentionModule,
    BrowserAnimationsModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
