import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapseBlockComponent} from './collapse-block.component';
import {ActionEnum} from "../../shared/model/enum/action.enum";

describe('CollapseBlockComponent', () => {
  let component: CollapseBlockComponent;
  let fixture: ComponentFixture<CollapseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseBlockComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollapseBlockComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('collapseId', 'Id');
    fixture.componentRef.setInput('actionType', ActionEnum.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
