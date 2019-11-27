export class Product {
    constructor(
        public id: string,
        public quantity: number,
        public price: string,
        public availability: boolean,
        public name: string
    ) { }
}