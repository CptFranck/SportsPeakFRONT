import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapseGroupItemComponent} from './collapse-group-item.component';

describe('CollapseGroupComponent', () => {
  let component: CollapseGroupItemComponent;
  let fixture: ComponentFixture<CollapseGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseGroupItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollapseGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
