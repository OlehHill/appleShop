import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryProduct } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  uploadPercent!: Observable<number> | null;
  image: string = '';
  imageStatus: boolean | undefined;
  adminCategories: Array<CategoryProduct> = [];
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.initCategoryForm();
    this.initLoadCategory();
  }
  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      pathName: [null, Validators.required],
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
  submitCategoryForm(): void {
    const category: CategoryProduct = {
      ...this.categoryForm.value,
      image: this.image
    };
    this.categoryService.create(category).subscribe(() => {
      this.categoryForm.reset();
      this.imageStatus = false;
      this.image = '';
      this.initLoadCategory();
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
        this.categoryForm.patchValue({
          image: this.image
        })
        this.imageStatus = true;
        this.uploadPercent = null;
      });
    });
  }
  deleteFile(category?: CategoryProduct): void {
    const pathImage = category?.image || this.image;
    this.storage.storage.refFromURL(pathImage).delete().then(
      () => {
        console.log('Image deleted!');
        this.image = '';
        this.imageStatus = false;
      }
    ).catch(err => console.log(err));
  }
  deleteCategory(category: CategoryProduct): void {
    this.categoryService.delete(category.id).subscribe(
      () => {
        this.deleteFile(category);
        this.initLoadCategory();
      },
      err => {
        console.log(err);
      }
    )
  }

  editCategory(category: CategoryProduct): void {
    this.categoryForm.patchValue({
      name: category.name,
      pathName: category.pathName 
    });
    this.image = category.image;
    this.imageStatus = true;
  }


}