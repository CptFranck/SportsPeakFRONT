import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeSelectorComponent} from './privilege-selector.component';
import {PrivilegeService} from "../../../core/services/privilege/privilege.service";
import {of} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('PrivilegeSelectorComponent', () => {
  let component: PrivilegeSelectorComponent;
  let fixture: ComponentFixture<PrivilegeSelectorComponent>;

  const mockPrivilegeService = {
    isLoading$: of(true),
    privilegeList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: PrivilegeService, useValue: mockPrivilegeService},
      ],
      imports: [PrivilegeSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
