import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalButtonComponent} from './modal-button.component';

describe('ButtonComponent', () => {
  let component: ModalButtonComponent;
  let fixture: ComponentFixture<ModalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
