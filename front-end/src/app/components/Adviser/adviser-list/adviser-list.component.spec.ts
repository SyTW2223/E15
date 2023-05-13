import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserListComponent } from './adviser-list.component';

describe('AdviserListComponent', () => {
  let component: AdviserListComponent;
  let fixture: ComponentFixture<AdviserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
