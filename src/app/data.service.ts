import { Injectable, Injector } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Observable } from 'rxjs';
import { Product } from './product/product';
import { ProductInterface } from './product/product.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {
    private static aUrl = 'https://demo0928420.mockable.io/products/list';
    httpClient: HttpClient;
    public products = [];

    constructor(
        private inject: Injector
    ) { }

    createDb() {
        return Promise.all([
            fetch(DataService.aUrl)
        ])
            .then((result: any) => {
                return Promise.all(result.map(x => x.json()));
            })
            .then(
                (result: any) => {
                    return { products: result[0].products }
                }
            );
    }
}
