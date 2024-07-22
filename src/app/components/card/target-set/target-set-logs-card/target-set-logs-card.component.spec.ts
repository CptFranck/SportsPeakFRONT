import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetLogsCardComponent} from './target-set-logs-card.component';

describe('TargetSetCardLogsComponent', () => {
  let component: TargetSetLogsCardComponent;
  let fixture: ComponentFixture<TargetSetLogsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetLogsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetLogsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
