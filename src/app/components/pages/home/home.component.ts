import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/product';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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
      })
    }
  }


}
