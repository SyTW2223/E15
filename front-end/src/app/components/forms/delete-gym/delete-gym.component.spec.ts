import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGymComponent } from './delete-gym.component';

describe('DeleteGymComponent', () => {
  let component: DeleteGymComponent;
  let fixture: ComponentFixture<DeleteGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
