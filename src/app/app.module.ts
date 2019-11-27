import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { DataService } from './data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        AppRouting,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
