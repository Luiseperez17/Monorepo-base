import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConteoComponent } from './formulario-conteo.component';

describe('FormularioConteoComponent', () => {
  let component: FormularioConteoComponent;
  let fixture: ComponentFixture<FormularioConteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
