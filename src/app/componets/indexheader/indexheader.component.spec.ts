import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexHeaderComponent } from './indexheader.component';

describe('NavbarComponent', () => {
  let component: IndexHeaderComponent;
  let fixture: ComponentFixture<IndexHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
