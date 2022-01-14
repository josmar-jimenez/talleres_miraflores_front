import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInventoryComponent } from './form-inventory.component';

describe('FormInventoryComponent', () => {
  let component: FormInventoryComponent;
  let fixture: ComponentFixture<FormInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
