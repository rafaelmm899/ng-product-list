import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ProductInterface } from './product.interface';


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public httpOptions;
    SERVER_URL: string = "api/";

    constructor(
        private _http: HttpClient
    ) {
        this.httpOptions = new HttpHeaders().set(
            "Content-Type",
            "application/json"
        );
    }

    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(this.SERVER_URL + 'products').pipe(
            map(res => {
                return res.map(item => {
                    return new Product(
                        item.id,
                        item.quantity,
                        item.price,
                        item.availability,
                        item.name
                    )
                })
            })
        )
    }

    getProduct(productId: string) {
        return this._http.get<Product>(this.SERVER_URL + 'products/' + productId).pipe(
            map(res => {
                return new Product(
                    res.id,
                    res.quantity,
                    res.price,
                    res.availability,
                    res.name
                )
            })
        );
    }

    update(product: Product) {
        return this._http.put(this.SERVER_URL + 'products/' + product.id, {
            availability: product.availability,
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        });
    }

    create(product: Partial<Product>) {
        return this._http.post(this.SERVER_URL + 'products', {
            availability: product.availability,
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        });
    }
}
