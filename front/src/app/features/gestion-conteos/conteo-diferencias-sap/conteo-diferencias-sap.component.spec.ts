import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoDiferenciasSapComponent } from './conteo-diferencias-sap.component';

describe('ConteoDiferenciasSapComponent', () => {
  let component: ConteoDiferenciasSapComponent;
  let fixture: ComponentFixture<ConteoDiferenciasSapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoDiferenciasSapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoDiferenciasSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
