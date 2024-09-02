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
  totalQuantity: number = 0
  private unsubscribe = new Subject<any>();

  constructor(private product: ProductService) { }


  ngOnInit() {
    this.loadProducts()
    this.dtoptions = {
      pagingType: 'full_numbers',
      order: [[0, 'desc']]
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
    this.dtTrigger.unsubscribe();
  }

  async loadProducts() {
    if (typeof window !== 'undefined') {
      try {
        this.product.GetAllProductsActives().subscribe(item => {
          this.productlist = this.productlist.concat(item)
          // this.productlist = this.productlist.filter(item => item.status === '1')
          // this.productlist.sort((a, b) => parseInt(a.updateDate) - parseInt(b.updateDate))
          this.productlist.forEach(element => {
            this.totalQuantity += element.quantity
          });
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
    switch (status) {
      case 1:
        window.document.getElementById("uploadstock")?.classList.remove('show')
        break;
      case 2:
        window.document.getElementById("addStock")?.classList.remove('show')
        break;
    }
  }


}
