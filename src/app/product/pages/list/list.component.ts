import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { SortEvent, NgbdSortableHeader, SortDirection } from '../../components/sortable/sortable.directive';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ProductService]
})
export class ListComponent implements OnInit {
    public products: Array<Product> = [];
    public searchString: string;
    public propertySearch: string = 'name';
    public filteredProducts: Array<Product> = [];
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
    public propertySort: string;
    public sortDirection: SortDirection;
    public isSort: boolean = false;

    constructor(
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.productService.getProducts().subscribe((data: Product[]) => {
            this.products = data;
            this.filteredProducts = [...this.products];
        })
    }

    goToCreate() {
        this.router.navigate(['products/create'])
    }

    search() {
        if (this.searchString == '' || typeof this.searchString == 'undefined') {
            this.filteredProducts = this.products
        } else {
            this.filteredProducts = this.products.filter((el) => {
                return el[this.propertySearch] == this.searchString;
            });
        }
    }

    compare(v1, v2) {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    onSort({ column, direction }: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        if (direction !== '') {
            this.filteredProducts.sort((a, b) => {
                const res = this.compare(
                    (typeof a[column] == 'string') ? a[column].toLowerCase() : a[column],
                    (typeof b[column] == 'string') ? b[column].toLowerCase() : b[column]
                );
                return direction === 'asc' ? res : -res;
            });
        }

        this.isSort = true;
    }

    removeSearch() {
        this.searchString = '';
        this.filteredProducts = this.products;
        if (this.isSort) {
            this.onSort({ column: this.propertySort, direction: this.sortDirection });
        }

    }
}
