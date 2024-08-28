import { Component } from '@angular/core';
import { FileService } from '../../../../services/file.service';
import { FunctionsService } from '../../../../services/functions.service';
import { VariableService } from '../../../../services/variable.service';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import excel from 'exceljs';

@Component({
  selector: 'app-stockfile',
  templateUrl: './stockfile.component.html',
  styleUrl: './stockfile.component.css'
})
export class StockfileComponent {
  user: any
  statusPageUpload: boolean = false
  statusuploadCheck: boolean = false
  uploaded: boolean = false
  dataUpload: any
  jsonData: any[] = [];
  constructor(private fileservice: FileService, private functionservices: FunctionsService, private variableservices: VariableService, private userservices: UserService) { }

  
  ngOnInit(): void {
    if (this.variableservices.user.id != '') {
      this.fetchUserData(this.variableservices.user.id)
    }
  }

  async fetchUserData(id: string) {
    this.user = await this.userservices.getUserById(id).toPromise()
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      this.parseExcle(arrayBuffer)
    }
    fileReader.readAsArrayBuffer(file)
  }

  downloadTemplate() {
    this.fileservice.downloadFile('ImportProductTemplate.xlsx').subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ImportProductTemplate.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
  parseExcle(arrayBuffer: any) {
    const workbox = new excel.Workbook();
    let countCheckHeader: number = 0
    workbox.xlsx.load(arrayBuffer).then((workbox) => {
      const rowHeader: any = ["", "barcode", "sku", "productName", "quantity", "status"]
      workbox.eachSheet((worksheet, sheetId) => {
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          let rowData: any = {};
          if (rowNumber === 1) {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              if (rowHeader[colNumber] === cell.value) {
                countCheckHeader++
              }
            });
          } else {
            if (countCheckHeader == 5) {
              row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                if (rowHeader[colNumber] == "barcode") {
                  rowData["barcode"] = cell.value?.toString();
                } else if (rowHeader[colNumber] == "sku") {
                  rowData["sku"] = cell.value?.toString();
                } else if (rowHeader[colNumber] == "productName") {
                  rowData["productName"] = cell.value;
                } else if (rowHeader[colNumber] == "quantity") {
                  rowData["quantity"] = cell.value;
                } else if (rowHeader[colNumber] == "status") {
                  rowData["status"] = cell.value?.toString();
                }
                rowData["updateBy"] = this.user.name
                rowData["updateDate"] = this.functionservices.formateDate(new Date());

              });
              this.jsonData.push(rowData);
            }
          }
        })
      })  
      if (countCheckHeader === 5) {
        console.log(JSON.stringify(this.jsonData, null, 2));
        this.statusPageUpload = true
      } else {
        Swal.fire({
          title: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
          icon: 'warning',
          showConfirmButton: false,
          timer: 5000
        })
      }
    })
  }

  backtoUpload() {
    window.location.reload();
  }
}
