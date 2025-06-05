import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeDeleteFormComponent} from './privilege-delete-form.component';
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {BehaviorSubject} from "rxjs";
import {Privilege} from "../../../../shared/model/dto/privilege";

describe('PrivilegeDeleteFormComponent', () => {
  let component: PrivilegeDeleteFormComponent;
  let fixture: ComponentFixture<PrivilegeDeleteFormComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('PrivilegeService', ['']);
  mockPrivilegeService.privileges = new BehaviorSubject<Privilege[]>([]);
  mockPrivilegeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: PrivilegeService, useValue: mockPrivilegeService},
      ],
      imports: [PrivilegeDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeDeleteFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('privilege', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
