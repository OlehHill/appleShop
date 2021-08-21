import { CategoryProduct } from "../category/category.interface";

export interface Product{
    category: CategoryProduct;
    name: string;
    description: string;
    price: number;
    image: string;
    count: number;
    id?: number;    
}