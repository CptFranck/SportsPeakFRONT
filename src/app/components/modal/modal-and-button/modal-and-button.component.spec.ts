import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalAndButtonComponent} from './modal-and-button.component';

describe('ModalComponent', () => {
  let component: ModalAndButtonComponent;
  let fixture: ComponentFixture<ModalAndButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAndButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalAndButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
