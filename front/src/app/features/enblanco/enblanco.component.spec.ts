import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnblancoComponent } from './enblanco.component';

describe('EnblancoComponent', () => {
  let component: EnblancoComponent;
  let fixture: ComponentFixture<EnblancoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnblancoComponent]
    });
    fixture = TestBed.createComponent(EnblancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
