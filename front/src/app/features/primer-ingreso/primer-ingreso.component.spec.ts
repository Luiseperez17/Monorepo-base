import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerIngresoComponent } from './primer-ingreso.component';

describe('PrimerIngresoComponent', () => {
  let component: PrimerIngresoComponent;
  let fixture: ComponentFixture<PrimerIngresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimerIngresoComponent]
    });
    fixture = TestBed.createComponent(PrimerIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
