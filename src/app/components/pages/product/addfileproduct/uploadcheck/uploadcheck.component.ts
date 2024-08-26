import { Component, Input, input, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/product.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-uploadcheck',
  templateUrl: './uploadcheck.component.html',
  styleUrl: './uploadcheck.component.css'
})
export class UploadcheckComponent implements OnInit {
  @Input() jsonData: any[] = []
  // jsonData: any[] = [{

  //   "barcode": 12345667892,
  //   "updateBy": "arm1",
  //   "updateDate": "26 August 2024 17:55:46",
  //   "sku": 1235,
  //   "productName": "test import",
  //   "quantity": 1,
  //   "status": 1

  // }]
  productsUpload: any[] = []
  uploadstatus: boolean = false
  exitProduct: boolean = false

  constructor(private productservice: ProductService) { }
  ngOnInit(): void {
    this.uploadFile();
  }

  async uploadFile() {
    if (this.jsonData.length != 0) {
      console.log(this.jsonData);

      await this.productservice.AddMultiProducts(this.jsonData).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);

          if (error.status == 200) {
            this.exitProduct = false
          }
          if (error.status == 409) {
            this.exitProduct = true
          }
          return throwError(() => error);
        })
      ).toPromise().then((data) => {
        this.productsUpload = this.productsUpload.concat(data)
        console.log(data);
        this.uploadstatus = true
      })
    }
  }
}
