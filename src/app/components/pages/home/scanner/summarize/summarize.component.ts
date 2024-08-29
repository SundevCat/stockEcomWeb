import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-summarize',
  templateUrl: './summarize.component.html',
  styleUrl: './summarize.component.css'
})
export class SummarizeComponent implements OnChanges {
  @Input() submitData: any[] = []
  data: any[] = []
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitData']) {
      console.log(this.submitData);

      this.data = this.submitData
      console.log(this.data);
    }
  }

  reload() {
    window.location.reload();
  }
}
