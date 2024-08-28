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
      console.log(this.jsonData);
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

          if (this.statusAddStock == 1) {
            Swal.update({
              title: 'กำลังเพิ่ม Stock รอสักครู่',
              showCancelButton: false,
              confirmButtonText: 'Uploading...',
              allowOutsideClick: false
            });
            await this.productservice.AddQuantityMultiProduct(this.jsonData, this.user.name).toPromise().then(() => { return true })
          }
          if (this.statusAddStock == 2) {
            Swal.update({
              title: 'กำลังตัด Stock รอสักครู่',
              showCancelButton: false,
              confirmButtonText: 'Uploading...',
              allowOutsideClick: false
            });
            await this.productservice.CutQuantityMultiProduct(this.jsonData, this.user.name).toPromise().then(() => { return true })
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
          if (this.statusAddStock == 2) {
            Swal.fire({
              title: 'ตัด stock สำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then(() => { window.location.reload() })
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
}
