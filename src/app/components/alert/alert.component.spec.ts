import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertComponent} from './alert.component';
import {AlertTypeEnum} from "../../shared/model/enum/alert.enum";
import {Alert} from "../../shared/model/common/alert";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    
    const alert: Alert = {
      id: 0,
      title: "title",
      message: "message",
      type: AlertTypeEnum.success,
      closed: false,
      autoClose: false
    }

    fixture.componentRef.setInput('alert', alert);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
