import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiagnosisComponent } from './my-diagnosis.component';

describe('MyDiagnosisComponent', () => {
  let component: MyDiagnosisComponent;
  let fixture: ComponentFixture<MyDiagnosisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDiagnosisComponent]
    });
    fixture = TestBed.createComponent(MyDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
