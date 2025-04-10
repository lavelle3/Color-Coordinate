import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateComponent } from './coordinate.component';

describe('CoordinateComponent', () => {
  let component: CoordinateComponent;
  let fixture: ComponentFixture<CoordinateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
