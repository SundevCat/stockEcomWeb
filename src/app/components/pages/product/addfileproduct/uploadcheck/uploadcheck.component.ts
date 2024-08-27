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
      console.log(this.productsUpload);
      await this.productservice.AddMultiProducts(this.jsonData).toPromise().then(() => { window.location.reload() })
    }
  }
}
