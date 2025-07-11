import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalButtonComponent} from './modal-button.component';

describe('ModalButtonComponent', () => {
  let component: ModalButtonComponent;
  let fixture: ComponentFixture<ModalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalButtonComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalId', "Id");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
