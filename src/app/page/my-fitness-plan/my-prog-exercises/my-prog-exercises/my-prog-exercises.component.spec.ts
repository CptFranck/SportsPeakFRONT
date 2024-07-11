import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExercisesComponent } from './my-prog-exercises.component';

describe('MyProgExercisesComponent', () => {
  let component: MyProgExercisesComponent;
  let fixture: ComponentFixture<MyProgExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
