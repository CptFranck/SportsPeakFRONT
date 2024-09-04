import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetsComponent} from './target-sets.component';

describe('TargetSetComponent', () => {
  let component: TargetSetsComponent;
  let fixture: ComponentFixture<TargetSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
