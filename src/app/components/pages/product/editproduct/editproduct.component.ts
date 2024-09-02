import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { product } from '../../../../models/product';
import { VariableService } from '../../../../services/variable.service';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnChanges {
  @Input() sku: any
  submitted: boolean = false
  formEditProduct: any
  user: any
  product: any
  constructor(private productserviec: ProductService, private formbuild: FormBuilder, private variableservice: VariableService, private userservice: UserService) {
    this.formEditProduct = this.formbuild.group({
      sku: [""],
      productName: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [""],
      updateDate: [""],
      updateBy: [""],
      barcode: ["", Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sku']) {
      console.log(this.sku);

      if (this.sku) {
        this.getUserName();
        this.getProductBySku()
      }
    }
  }

  async getUserName() {
    this.user = await this.userservice.getUserById(this.variableservice.user.id).toPromise().then(user => { return user?.name })
  }

  async getProductBySku() {
    this.product = await this.productserviec.getProductBySku(this.sku).toPromise()
    if (this.product) {

      this.formEditProduct = this.formbuild.group({
        sku: [this.product.sku],
        productName: [this.product.productName, Validators.required],
        quantity: [this.product.quantity, [Validators.required, Validators.pattern('^[0-9]*$')]],
        status: [this.product.status, Validators.required],
        updateDate: [""],
        updateBy: [""],
        barcode: [this.product.barcode, Validators.required]
      })
    }

  }

  async onSubmit() {
    this.submitted = true;
    this.formEditProduct.value.updateBy = this.user
    console.log(this.formEditProduct.valid.quantity);
    if (this.formEditProduct.valid) {
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
            title: 'กำลังอัพเดทรอสักครู่',
            showCancelButton: false,
            confirmButtonText: 'Uploading...',
            allowOutsideClick: false
          });
          await this.productserviec.UpdateProduct(this.formEditProduct.value, this.sku).toPromise().then(() => { return true });
        }
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          Swal.fire({
            title: 'อัพเดทเรียบร้อย',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          }).then(() => window.location.reload())
        }
      })
    }
  }
}
