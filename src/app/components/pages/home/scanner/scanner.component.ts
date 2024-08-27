import { AfterViewInit, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { product } from '../../../../models/product';
import { UserService } from '../../../../services/user.service';
import { VariableService } from '../../../../services/variable.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() status: any
  products: any[] = []
  statusReady: boolean = false
  scannedBarcode: string = ''
  scannedProducts: product[] = []
  submitted: boolean = false
  submitData: any
  user: any

  private unsubscribe = new Subject<any>()

  constructor(private productservice: ProductService, private userservice: UserService, private variableservice: VariableService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      if (this.status === 1) {
        console.log(this.status);
        this.statusReady = true
      }
    }
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.fetchProducts();
      this.fetchUsers();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null)
    this.unsubscribe.complete();
  }

  async fetchUsers() {
    this.user = await this.userservice.getUserById(this.variableservice.user.id).toPromise()
  }

  async fetchProducts() {
    this.products = this.products.concat(await this.productservice.getAllProducts().toPromise())
    this.products = this.products.filter(item => item.status == 1)
    console.log(this.products);

  }
  async addStock() {
    if (this.scannedProducts) {
      Swal.fire({
        title: "Are you sure?",
        text: "ต้องการเพิ่ม Stock หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.submitted = true;
          this.submitData = await this.productservice.AddQuantityMultiProduct(this.scannedProducts, this.user.name).toPromise().then(() => {
            Swal.fire({
              title: 'เพิ่มสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            })
          });

        }
      })
    }
  }

  async cutStock() {
    if (this.scannedProducts) {
      Swal.fire({
        title: "Are you sure?",
        text: "ต้องการตัด Stock หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.submitted = true;
          this.submitData = await this.productservice.CutQuantityMultiProduct(this.scannedProducts, this.user.name).toPromise().then(() => {
            Swal.fire({
              title: 'เพิ่มสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            })
          });
        }
      })
    }
  }

  onBarcodeScanned() {
    if (this.statusReady) {
      // ใช้ == 13 เพราะใน barcode มี 13 หลัก
      if (this.scannedBarcode.length == 13) {
        this.scannedProduct(this.scannedBarcode)
        this.scannedBarcode = ''
      }
    }
  }

  deleteScannedProduct(sku: string) {
    if (this.scannedProducts) {
      this.scannedProducts.splice(this.scannedProducts.findIndex((item) => item.sku == sku), 1)
      console.log(this.scannedProducts);

    }
  }

  scannedProduct(barcode: string) {
    const item = this.products.find(item => item.barcode == barcode)
    if (item) {
      const check = this.scannedProducts.find((item) => item.barcode == barcode);
      if (check) {
        check.quantity += 1
        this.scannedProducts.splice(this.scannedProducts.findIndex((item) => item.sku == check.sku), 1)
        this.scannedProducts.push(check)
      } else {
        var product: product = this.products.find(item => item.barcode == barcode)
        product.quantity = 1
        this.scannedProducts.push(product)
      }
      console.log(this.scannedProducts);
    } else {
      Swal.fire({
        title: 'product notfound',
        showConfirmButton: false,
        icon: 'warning',
        timer: 1000
      })
    }
  }
}
