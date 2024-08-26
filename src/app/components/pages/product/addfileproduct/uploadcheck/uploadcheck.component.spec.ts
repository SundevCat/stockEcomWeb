import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcheckComponent } from './uploadcheck.component';

describe('UploadcheckComponent', () => {
  let component: UploadcheckComponent;
  let fixture: ComponentFixture<UploadcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadcheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
