import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiSelectOptionsComponent} from './multi-select-options.component';
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MultiSelectOptionsComponent', () => {
  let component: MultiSelectOptionsComponent;
  let fixture: ComponentFixture<MultiSelectOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectOptionsComponent],
      providers: [
        provideAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MultiSelectOptionsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isLoading', true);
    fixture.componentRef.setInput('optionList', []);
    fixture.componentRef.setInput('selectedOptions', []);
    fixture.componentRef.setInput('addDescriptionToOption', true);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
