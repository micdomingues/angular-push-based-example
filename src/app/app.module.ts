import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PullBasedService } from './pull-based/pull-based.service';
import { PullBasedComponent } from './pull-based/pull-based.component';


@NgModule({
  declarations: [
    AppComponent,
    PullBasedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [PullBasedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
