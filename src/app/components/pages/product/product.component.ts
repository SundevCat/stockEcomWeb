import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productlist: any
  dtoptions: Config = {}
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private product: ProductService) { }


  ngOnInit(): void {
    this.loadProducts()
    this.dtoptions = {
      pagingType: 'full_numbers'
    }

  }


  loadProducts() {
    if (typeof window !== 'undefined') {
      this.product.getAllProducts().subscribe(item => {
        this.productlist = item;
        this.dtTrigger.next(null)
        console.log(this.productlist);
      })
    }
  }

}
