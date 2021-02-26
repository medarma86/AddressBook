import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { AppComponent } from './app.component';
import { ConfirmationService, ConfirmDialogModule, TableModule } from 'primeng';
import {KeyFilterModule} from 'primeng/keyfilter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    TableModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    ConfirmDialogModule,
    KeyFilterModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

