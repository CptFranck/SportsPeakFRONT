import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeSelectorComponent} from './privilege-selector.component';
import {PrivilegeService} from "../../../services/privilege/privilege.service";
import {BehaviorSubject} from "rxjs";
import {Privilege} from "../../../interface/dto/privilege";

describe('PrivilegeSelectorComponent', () => {
  let component: PrivilegeSelectorComponent;
  let fixture: ComponentFixture<PrivilegeSelectorComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('PrivilegeService', ['privileges', 'isLoading']);
  mockPrivilegeService.privileges = new BehaviorSubject<Privilege[]>([]);
  mockPrivilegeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
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
