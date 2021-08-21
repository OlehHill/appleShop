import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryProduct } from 'src/app/shared/interfaces/category/category.interface';
import { Product } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  productForm!: FormGroup;
  uploadPercent!: Observable<number> | null;
  image: string = '';
  imageStatus: boolean | undefined;
  adminCategories: Array<CategoryProduct> = [];
  adminProduct: Array<Product> = [];
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.initProductForm();
    this.initLoadCategory();
    this.initLoadProducts();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required]
    })
  }
  initLoadCategory(): void {
    this.categoryService.getAll().subscribe(
      data => {
        this.adminCategories = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  initLoadProducts(): void {
    this.productService.getAll().subscribe(
      data => {
        this.adminProduct = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  submitProductForm(): void {
    const product: Product = {
      ...this.productForm.value,
      image: this.image,
      count: 1
    };
    this.productService.create(product).subscribe(() => {
      this.productForm.reset();
      this.imageStatus = false;
      this.image = '';
      this.initLoadProducts();
    })
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges() as Observable<number>;
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.productForm.patchValue({
          image: this.image
        })
        this.imageStatus = true;
        this.uploadPercent = null;
      });
    });
  }
  deleteFile(product?: Product): void {
    const pathImage = product?.image || this.image;
    this.storage.storage.refFromURL(pathImage).delete().then(
      () => {
        console.log('Image deleted!');
        this.image = '';
        this.imageStatus = false;
      }
    ).catch(err => console.log(err));
  }
  editProduct(product?: Product): void {}
  deleteProduct(product?: Product): void {}
}