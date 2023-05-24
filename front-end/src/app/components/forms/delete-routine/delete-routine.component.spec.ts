import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoutineComponent } from './delete-routine.component';

describe('DeleteRoutineComponent', () => {
  let component: DeleteRoutineComponent;
  let fixture: ComponentFixture<DeleteRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoutineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
