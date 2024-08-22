import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfileproductComponent } from './addfileproduct.component';

describe('AddfileproductComponent', () => {
  let component: AddfileproductComponent;
  let fixture: ComponentFixture<AddfileproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddfileproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddfileproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
