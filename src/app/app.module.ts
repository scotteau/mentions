import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {EditorFieldComponent} from './editor-field/editor-field.component';
import {MentionModule} from 'angular-mentions';

@NgModule({
  declarations: [
    AppComponent,
    EditorFieldComponent,
  ],
  imports: [
    BrowserModule,
    MentionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
