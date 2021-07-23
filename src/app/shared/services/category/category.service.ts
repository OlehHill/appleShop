import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/category';
  }
  getAll(): Observable<Array<CategoryProduct>> {
    return this.http.get<Array<CategoryProduct>>(this.url);
  }

  getOne(id: number): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`${this.url}/${id}`);
  }

  create(category: CategoryProduct): Observable<CategoryProduct> {
    return this.http.post<CategoryProduct>(this.url, category);
  }

  delete(id: number): Observable<CategoryProduct> {
    return this.http.delete<CategoryProduct>(`${this.url}/${id}`);
  }

  update(category: CategoryProduct, id: number): Observable<CategoryProduct> {
    return this.http.put<CategoryProduct>(`${this.url}/${id}`, category);
  }
}
