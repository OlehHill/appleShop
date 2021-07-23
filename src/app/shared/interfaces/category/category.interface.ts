export interface CategoryProduct {
    name: string;
    pathName: string;
    image: string;
    id?: number;
}

export class Category implements CategoryProduct {
    constructor(
        public name: string,
        public pathName: string,
        public image: string,
    ){}
}