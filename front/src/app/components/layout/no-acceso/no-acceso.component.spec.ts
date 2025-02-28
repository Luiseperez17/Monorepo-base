import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccesoComponent } from './no-acceso.component';

describe('NoAccesoComponent', () => {
  let component: NoAccesoComponent;
  let fixture: ComponentFixture<NoAccesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoAccesoComponent]
    });
    fixture = TestBed.createComponent(NoAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
