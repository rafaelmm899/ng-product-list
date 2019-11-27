import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../components/message/message.service';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    providers: [ProductService]
})
export class FormComponent implements OnInit {
    public productId: string;
    public product: Product;
    public registerForm: FormGroup;
    public submitted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {
        this.product = new Product('', 0, '', false, '');
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            price: ['', Validators.required],
            availability: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get("id");

        if (this.productId) {
            this.productService.getProduct(this.productId).subscribe(
                (data: Product) => {
                    this.product = new Product(data.id,
                        data.quantity,
                        data.price,
                        data.availability,
                        data.name);


                    this.registerForm.get('name').setValue(this.product.name);
                    this.registerForm.get('quantity').setValue(this.product.quantity);
                    this.registerForm.get('price').setValue(this.product.price);
                    this.registerForm.get('availability').setValue(this.product.availability);
                }
            )
        }
    }

    hasError(formControlName: string) {
        return (this.registerForm.controls[formControlName].errors
            && (this.registerForm.controls[formControlName].touched || this.submitted === true))
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid)
            return;

        Object.assign(this.product, this.registerForm.value);

        if (this.productId) {

            this.productService.update(this.product).subscribe((data) => {
                this.router.navigate(['/products/list']);
                this.messageService.sendMessage('Product successfully updated', 'success');
            })
        } else {
            this.product.id = Math.round(Math.random() * 1000000).toString();
            this.productService.create(this.product).subscribe((data) => {
                this.router.navigate(['/products/list']);
                this.messageService.sendMessage('Product successfully created', 'success');
            })
        }
    }


}
