import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetEntityFormComponent} from './target-set-entity-form.component';
import {TargetSetService} from "../../../../services/target-set/target-set.service";

describe('TargetSetEntityFormComponent', () => {
  let component: TargetSetEntityFormComponent;
  let fixture: ComponentFixture<TargetSetEntityFormComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService}
      ],
      imports: [TargetSetEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
