import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalComponent} from './modal.component';
import {ActionEnum} from "../../../shared/model/enum/action.enum";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', "title");
    fixture.componentRef.setInput('modalId', "Id");
    fixture.componentRef.setInput('actionType', ActionEnum.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
