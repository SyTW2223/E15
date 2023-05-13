import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDietComponent } from './delete-diet.component';

describe('DeleteDietComponent', () => {
  let component: DeleteDietComponent;
  let fixture: ComponentFixture<DeleteDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
