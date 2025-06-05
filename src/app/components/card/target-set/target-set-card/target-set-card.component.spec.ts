import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetCardComponent} from './target-set-card.component';
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";
import {generateTestTargetSet} from "../../../../utils/testFunctions";

describe('TargetSetCardComponent', () => {
  let component: TargetSetCardComponent;
  let fixture: ComponentFixture<TargetSetCardComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService> =
    jasmine.createSpyObj('TargetSetService', ['modifyTargetSetState']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService},
      ],
      imports: [TargetSetCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('targetSetModalId', 'Id');
    fixture.componentRef.setInput('performanceLogModalId', 'IdBis');
    fixture.componentRef.setInput('targetSet', generateTestTargetSet());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
