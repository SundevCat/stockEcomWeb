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
      this.data = this.submitData
    }
  }

  reload() {
    window.location.reload();
  }
}
