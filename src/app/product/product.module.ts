import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ProductComponent } from './product/product.component';
import { FormComponent } from './pages/form/form.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './components/sortable/sortable.directive';
import { MessageComponent } from './components/message/message.component';



@NgModule({
    declarations: [ListComponent, ProductComponent, FormComponent, NgbdSortableHeader, MessageComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(DataService),
        ProductRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [

    ]
})
export class ProductModule { }
