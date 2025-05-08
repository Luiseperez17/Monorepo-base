import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoVencidosComponent } from './conteo-vencidos.component';

describe('ConteoVencidosComponent', () => {
  let component: ConteoVencidosComponent;
  let fixture: ComponentFixture<ConteoVencidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoVencidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoVencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
