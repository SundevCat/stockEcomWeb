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
  submitData: any[] = []
  user: any
  copyProducts: any[] = []
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
    this.unsubscribe.unsubscribe();
  }

  async fetchUsers() {
    this.user = await this.userservice.getUserById(this.variableservice.user.id).toPromise()
  }

  async fetchProducts() {
    this.products = this.products.concat(await this.productservice.getAllProducts().toPromise())
    this.products = this.products.filter(item => item.status == 1)
    this.copyProducts = this.products.slice().map(obj => ({ ...obj }))
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
        confirmButtonText: "Yes",
        preConfirm: async () => {
          Swal.update({
            title: 'กำลังตัด Stock รอสักครู่',
            showCancelButton: false,
            confirmButtonText: 'Uploading...',
            allowOutsideClick: false
          });
          this.submitted = true;
          this.submitData = this.submitData.concat(await this.productservice.AddQuantityMultiProduct(this.scannedProducts, this.user.name).toPromise())
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(this.submitData);
          this.submitted = true;
          Swal.fire({
            title: 'เพิ่มสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    }
  }

  async cutStock() {
    var checkQuantity: boolean = true
    if (this.scannedProducts) {
      Swal.fire({
        title: "Are you sure?",
        text: "ต้องการตัด Stock หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        preConfirm: async () => {
          Swal.update({
            title: 'กำลังตัด Stock รอสักครู่',
            showCancelButton: false,
            confirmButtonText: 'Uploading...',
            allowOutsideClick: false
          });
          this.scannedProducts.forEach(async (scannedProduct) => {
            const item = this.products.find(item => item.barcode == scannedProduct.barcode)
            if (item.quantity - scannedProduct.quantity < 0) {
              checkQuantity = false
              this.submitData.push({
                sku: item.sku,
                quantity: item.quantity
              })
            }
          });
          console.log(checkQuantity);
          if (checkQuantity) {
            this.submitted = true;
            this.submitData = this.submitData.concat(await this.productservice.CutQuantityMultiProduct(this.scannedProducts, this.user.name).toPromise())
          }
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(this.submitData);
          if (checkQuantity) {
            Swal.fire({
              title: 'ตัดสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            })
          } else {
            this.submitted = true;
            Swal.fire({
              title: 'ตัดสินค้าเกินจำนวน',
              icon: 'warning',
              showConfirmButton: false,
              timer: 3000
            })
          }
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
        let item = this.copyProducts.find(item => item.barcode == barcode)
        item.quantity = 1
        this.scannedProducts.push(item)
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
