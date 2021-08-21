import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }
  getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url);
  }
  getAllByCategory(categoryName:string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.url}?category.pathName=${categoryName}`);
  }

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(category: Product): Observable<Product> {
    return this.http.post<Product>(this.url, category);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

  update(category: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, category);
  }
}