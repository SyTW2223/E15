import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDietComponent } from './update-diet.component';

describe('UpdateDietComponent', () => {
  let component: UpdateDietComponent;
  let fixture: ComponentFixture<UpdateDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
