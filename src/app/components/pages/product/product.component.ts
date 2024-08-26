import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
  productlist: any[] = []
  dtoptions: Config = {}
  dtTrigger: Subject<any> = new Subject<any>()
  private unsubscribe = new Subject<any>();
  constructor(private productservice: ProductService) { }


  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.dtoptions = {
        pagingType: 'full_numbers',
      }
      this.loadProducts()
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  async deleteProduct(sku: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: ' #d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.productservice.DeleteProduct(sku).toPromise().then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your product has beed deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          this.productlist.splice(this.productlist.findIndex(item => item.sku == sku), 1)
        });
      }
    })
  }


  loadProducts() {
    this.productservice.getAllProducts().subscribe((item) => {
      this.productlist = this.productlist.concat(item)
      this.dtTrigger.next(null)
    })
  }


  switchCoolapse(status: number) {
    switch (status) {
      case 1:
        window.document.getElementById("addproduct")?.classList.remove('show')
        break;
      case 2:
        window.document.getElementById("addfileproduct")?.classList.remove('show')
        break;
    }
  }
}
