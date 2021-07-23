import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categoryForm!: FormGroup; 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  initCategoryForm(): void{
    this.categoryForm=this.fb.group({
      name: [null, Validators.required],
      pathName: [null, Validators.required],
    })
  }


}
