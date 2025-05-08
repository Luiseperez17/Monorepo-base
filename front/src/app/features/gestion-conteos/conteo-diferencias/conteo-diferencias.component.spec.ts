import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoDiferenciasComponent } from './conteo-diferencias.component';

describe('ConteoDiferenciasComponent', () => {
  let component: ConteoDiferenciasComponent;
  let fixture: ComponentFixture<ConteoDiferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoDiferenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoDiferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
