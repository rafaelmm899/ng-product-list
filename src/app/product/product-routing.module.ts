import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';


const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'detail/:id',
                component: FormComponent
            },
            {
                path: 'create',
                component: FormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
