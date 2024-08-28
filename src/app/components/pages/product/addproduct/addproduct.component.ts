import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VariableService } from '../../../../services/variable.service';
import { UserService } from '../../../../services/user.service';
import { user } from '../../../../models/user';
import { ProductService } from '../../../../services/product.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FunctionsService } from '../../../../services/functions.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  product: any
  user?: user
  submit: boolean = false
  skuChecked: boolean = false
  addproductStatus: boolean = false
  constructor(private formbuilder: FormBuilder, private variableservice: VariableService, private userservice: UserService, private productservice: ProductService, private functionservice: FunctionsService) {
    this.product = formbuilder.group({
      sku: [null, Validators.required],
      productName: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['1'],
      updateDate: [null],
      updateBy: [null],
      barcode: [null, Validators.required],
    })
  }
  async ngOnInit() {
    if (this.variableservice.user.id != '') {
      await this.getUserById()
    }
  }

  unChecked() {
    this.skuChecked = false
  }

  onSubmit() {
    this.submit = true
    if (this.product.valid) {
      this.product.value.updateBy = this.user?.name
      this.product.value.quantity = parseInt(this.product.value.quantity)
      this.product.value.updateDate = this.functionservice.formateDate(new Date())
      console.log(this.product.value);

      this.productservice.AddProduct(this.product.value).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status == 409) {
          this.skuChecked = true
        } else {
          this.skuChecked = false
        }
        return throwError(() => new Error(error.message))
      })).subscribe(data => {
        this.addproductStatus = true
        setTimeout(() => {
          window.location.reload()
        }, 200)
      })
    }
  }

  async getUserById() {
    this.user = await this.userservice.getUserById(this.variableservice.user.id).toPromise()
  }
}
