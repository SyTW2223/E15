import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietMenuComponent } from './diet-menu.component';

describe('DietMenuComponent', () => {
  let component: DietMenuComponent;
  let fixture: ComponentFixture<DietMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
