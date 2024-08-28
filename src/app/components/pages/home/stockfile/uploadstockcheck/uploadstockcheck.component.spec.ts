import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadstockcheckComponent } from './uploadstockcheck.component';

describe('UploadstockcheckComponent', () => {
  let component: UploadstockcheckComponent;
  let fixture: ComponentFixture<UploadstockcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadstockcheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadstockcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
