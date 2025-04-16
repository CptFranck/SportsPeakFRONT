import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MusclesAdminArrayComponent} from './muscles-admin-array.component';

describe('MusclesArrayComponent', () => {
  let component: MusclesAdminArrayComponent;
  let fixture: ComponentFixture<MusclesAdminArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusclesAdminArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MusclesAdminArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
