import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiSelectSelectedOptionsComponent} from './multi-select-selected-options.component';

describe('MultiSelectSelectedOptionsComponent', () => {
  let component: MultiSelectSelectedOptionsComponent;
  let fixture: ComponentFixture<MultiSelectSelectedOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectSelectedOptionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultiSelectSelectedOptionsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedOptions', []);
    fixture.componentRef.setInput('displayedSelectedOptions', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
