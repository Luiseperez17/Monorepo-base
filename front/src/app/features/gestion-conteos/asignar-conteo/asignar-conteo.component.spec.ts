import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarConteoComponent } from './asignar-conteo.component';

describe('AsignarConteoComponent', () => {
  let component: AsignarConteoComponent;
  let fixture: ComponentFixture<AsignarConteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarConteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
