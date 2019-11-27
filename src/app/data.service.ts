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

        /*let products = [
            { quantity: 514, price: "$11,042", availability: false, name: "dolor", id: 1 },
            { quantity: 887, price: "$17,532", availability: true, name: "dolor", id: 2 },
            { quantity: 202, price: "$6,174", availability: true, name: "enim", id: 3 },
            { quantity: 700, price: "$1,904", availability: false, name: "ad", id: 4 },
            { quantity: 343, price: "$14,388", availability: false, name: "ullamco", id: 5 },
            { quantity: 435, price: "$6,809", availability: false, name: "mollit", id: 6 }
        ];

        return { products };*/

    }

    /*genId(): number {
        return Math.round(Math.random() * 1000000);
    }*/
}
