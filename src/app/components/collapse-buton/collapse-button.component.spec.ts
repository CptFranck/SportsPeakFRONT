import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapseButtonComponent} from './collapse-button.component';

describe('CollapseButtonComponent', () => {
  let component: CollapseButtonComponent;
  let fixture: ComponentFixture<CollapseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollapseButtonComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('value', true)
    fixture.componentRef.setInput('btnClass', "btnClass");
    fixture.componentRef.setInput('collapseId', "Id");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
