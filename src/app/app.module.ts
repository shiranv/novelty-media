import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { RedditDataService } from './services/reddit-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [RedditDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
