import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMedu2Component } from './product-category-medu2.component';

describe('ProductCategoryMedu2Component', () => {
  let component: ProductCategoryMedu2Component;
  let fixture: ComponentFixture<ProductCategoryMedu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryMedu2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryMedu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
