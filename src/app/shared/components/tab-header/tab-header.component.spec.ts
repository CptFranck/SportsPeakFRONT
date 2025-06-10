import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TabHeaderComponent} from './tab-header.component';

describe('TabHeaderComponent', () => {
  let component: TabHeaderComponent;
  let fixture: ComponentFixture<TabHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabHeaderComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tabId', 'Id');
    fixture.componentRef.setInput('tabOptions', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
