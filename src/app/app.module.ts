import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountsService } from "./accounts.service";
import { CommentsService } from "./comments.service";
import { TimePipe } from './time.pipe';
import { ModalComponent } from './modal/modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    TimePipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AccountsService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
