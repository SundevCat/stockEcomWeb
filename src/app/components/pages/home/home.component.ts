import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/product';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  status: any = 0
  addState: boolean = false
  cutState: boolean = false
  productlist: product[] = []
  dtoptions: Config = {}
  dtTrigger: Subject<any> = new Subject<any>()
  private unsubscribe = new Subject<any>();

  constructor(private product: ProductService) { }


  ngOnInit() {
    this.loadProducts()
    this.dtoptions = {
      pagingType: 'full_numbers'
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  async loadProducts() {
    if (typeof window !== 'undefined') {
      try {
        this.product.getAllProducts().subscribe(item => {
          this.productlist = this.productlist.concat(item)
          this.productlist = this.productlist.filter(item => item.status === '1')
          this.dtTrigger.next(null)
        })
      } catch (e) {
        console.log(e);
      }
    }
  }

  switchCoolapse(status: number) {
    if (this.status == status) {
      this.status = 0
    } else {
      this.status = status
    }
  }
}
