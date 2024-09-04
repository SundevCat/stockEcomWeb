import { Component, Input, input, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/product.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadcheck',
  templateUrl: './uploadcheck.component.html',
  styleUrl: './uploadcheck.component.css'
})
export class UploadcheckComponent implements OnInit {
  @Input() jsonData: any[] = []
  productsUpload: any[] = []
  uploadstatus: boolean = false
  exitsProduct: boolean = true

  constructor(private productservice: ProductService) { }
  ngOnInit() {
    this.validateProducts();
  }

  async validateProducts() {
    if (this.jsonData.length != 0) {
      console.log(this.jsonData);

      await this.productservice.ValidateAddMultiProducts(this.jsonData).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
            this.exitsProduct = true
            this.uploadstatus = true
            this.productsUpload = this.productsUpload.concat(error.error)
          } else if (error.status == 400) {
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: 'กรุณาตรวจสอบไฟล์ก่อนอัพโหลด',
              showConfirmButton: false,
              timer: 3000
            }).then(() => {
              window.location.reload();
            })
          }
          return throwError(() => error);
        })
      ).toPromise().then((data) => {
        this.exitsProduct = false
        this.uploadstatus = true
        this.productsUpload = this.productsUpload.concat(data)
      })
    }
  }

  async uploadFile() {
    if (this.exitsProduct == false) {
      Swal.fire({
        title: "ยืนยันการอัพโหลด",
        icon: 'question',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        preConfirm: async () => {
          Swal.update({
            title: 'กำลังอัพโหลดรอสักครู่',
            showCancelButton: false,
            confirmButtonText: 'Uploading...',
            allowOutsideClick: false
          });
          await this.productservice.AddMultiProducts(this.jsonData).toPromise().then(() => { return true })
        }
      }).then((result) => {
        Swal.fire({
          title: 'อัพโหลดสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then(() => { window.location.reload() })
      })
    }
  }
}
