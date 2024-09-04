import { Component, Input } from '@angular/core';
import { ProductService } from '../../../../../services/product.service';
import { VariableService } from '../../../../../services/variable.service';
import { UserService } from '../../../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-uploadstockcheck',
  templateUrl: './uploadstockcheck.component.html',
  styleUrl: './uploadstockcheck.component.css'
})
export class UploadstockcheckComponent {
  @Input() jsonData: any[] = []
  note: string = ""
  products: any[] = []
  productsUpload: any[] = []
  uploadstatus: boolean = false
  user: any
  statusAddStock: any = 0
  constructor(private productservice: ProductService, private variableservice: VariableService, private userservice: UserService) { }
  ngOnInit() {
    this.checkProducts();
  }

  onSelectChange(event: Event): void {
    this.statusAddStock = (event.target as HTMLSelectElement).value;
  }
  async checkProducts() {
    if (this.jsonData.length != 0) {
      this.user = await this.userservice.getUserById(this.variableservice.user.id).toPromise();
      this.uploadstatus = true
      this.products = this.products.concat(await this.productservice.GetAllProductsActives().toPromise())
    }
  }

  async uploadFile() {
    if (this.statusAddStock == 1 || this.statusAddStock == 2) {
      Swal.fire({
        title: "ยืนยันการอัพโหลด",
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        preConfirm: async () => {
          if (this.findProductDoseExits(this.products, this.jsonData).length == 0) {
            if (this.statusAddStock == 1) {
              Swal.update({
                title: 'กำลังเพิ่ม Stock รอสักครู่',
                showCancelButton: false,
                confirmButtonText: 'Uploading...',
                allowOutsideClick: false
              });
              if (this.note == "") {
                this.note = "Blank"
              }
              await this.productservice.AddQuantityMultiProduct(this.jsonData, this.user.name, this.note).pipe().toPromise().then(() => { return true })
            }
            if (this.statusAddStock == 2) {
              Swal.update({
                title: 'กำลังตัด Stock รอสักครู่',
                showCancelButton: false,
                confirmButtonText: 'Uploading...',
                allowOutsideClick: false
              });

              if (this.checkCutStock(this.products, this.jsonData).length == 0) {
                if (this.note == "") {
                  this.note = "Blank"
                }
                await this.productservice.CutQuantityMultiProduct(this.jsonData, this.user.name, this.note).toPromise().then(() => { return true })
              } else {
                this.jsonData = this.checkCutStock(this.products, this.jsonData)
                this.statusAddStock = 4
              }
            }
          } else {
            this.statusAddStock = 3
            this.jsonData = this.findProductDoseExits(this.products, this.jsonData)
            console.log('error');
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.statusAddStock == 1) {
            Swal.fire({
              title: 'เพิ่ม stock สำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then(() => { window.location.reload() })
          }
          else if (this.statusAddStock == 2) {
            Swal.fire({
              title: 'ตัด stock สำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              window.location.reload()
            })
          } else if (this.statusAddStock == 3) {
            Swal.fire({
              title: 'ไม่พบ sku ',
              icon: 'error',
              showConfirmButton: false,
              timer: 1000
            })
          } else if (this.statusAddStock == 4) {
            Swal.fire({
              title: 'เกินจำนวน ไม่สามารถตัดได้ ',
              icon: 'error',
              showConfirmButton: false,
              timer: 1000
            })
          }
        }
      })
    } else {
      Swal.fire({
        title: 'กรุณาเลือกประเภทการอัพโหลด',
        icon: 'warning',
        timer: 1000,
        showConfirmButton: false
      })
    }
  }

  findProductDoseExits(listproduct: any[], newlistproduct: any[]) {
    const sku = new Set(listproduct.map(item => item['sku']))
    const productDoseexits = newlistproduct.filter(item => !sku.has(item['sku']))
    return productDoseexits
  }


  checkCutStock(listproduct: any[], newlistproduct: any[]) {
    var isChecked: any[] = []
    newlistproduct.forEach(item1 => {
      const matchItem = listproduct.find(item2 => item1.sku === item2.sku)
      if (matchItem) {
        if (matchItem.quantity < item1.quantity) {
          isChecked.push(item1)
        }
      }
    })
    return isChecked
  }
}
