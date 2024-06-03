import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertDisplayComponent} from './alert-display.component';

describe('CrudAlertComponent', () => {
  let component: AlertDisplayComponent;
  let fixture: ComponentFixture<AlertDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
