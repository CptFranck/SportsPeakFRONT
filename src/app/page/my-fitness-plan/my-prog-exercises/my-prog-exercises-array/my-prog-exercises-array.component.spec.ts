import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExercisesArrayComponent } from './my-prog-exercises-array.component';

describe('MyProgExercisesArrayComponent', () => {
  let component: MyProgExercisesArrayComponent;
  let fixture: ComponentFixture<MyProgExercisesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisesArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExercisesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
