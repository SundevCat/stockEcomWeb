import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockfileComponent } from './stockfile.component';

describe('StockfileComponent', () => {
  let component: StockfileComponent;
  let fixture: ComponentFixture<StockfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
