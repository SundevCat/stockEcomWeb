import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogsService } from '../../../services/logs.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import excel from 'exceljs';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit, OnDestroy {
  dataExport: any
  list_sku: any[] = []
  logs: any
  dtoptions: Config = {}
  dtTrigger: Subject<any> = new Subject<any>()

  constructor(private logsservice: LogsService) { }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.fetchLogs();
      this.dtoptions = {
        pagingType: 'full_numbers'
      }
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async fetchLogs() {
    await this.logsservice.getLogsAll().toPromise().then(async (data) => {
      this.logs = data
      this.dtTrigger.next(null)
    });
  }



  async exportExcle(id: string) {
    var datePipe = new DatePipe("en-US")
    this.dataExport = await this.logsservice.GetLogById(id).toPromise()
    const date = datePipe.transform(this.dataExport.timestamp,'dd/MM/yy HH:mm:ss')
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("history");
    worksheet.columns = [
      { header: 'sku', key: 'sku' },
      { header: 'quantity', key: 'quantity' }
    ]
    //split text form string to array
    const list_sku = this.dataExport.logsSku.match(/\{ sku = (\d+), quantity = (\d+) \}/g).map((item: any) => {
      const [_, sku, quantity,] = item.match(/sku = (\d+), quantity = (\d+)/);
      return { sku: parseInt(sku), quantity: parseInt(quantity) };
    })
    list_sku.forEach((item: any) => {
      worksheet.addRow({
        sku: item.sku,
        quantity: item.quantity
      })
    })

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `ExportHistory${date}.xlsx`)
  }
}
