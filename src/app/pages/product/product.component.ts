import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  products:Array<Product> =[];
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.routeSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        console.log(categoryName);
        this.loadProductByCategory(categoryName);
      }
    });
  }
 

  ngOnInit(): void {
  }
  loadProductByCategory(categoryName: any):void {
    this.productService.getAllByCategory(categoryName).subscribe(
      data => {
        this.products = data;
      }, err => {
        console.log(err);
        
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}