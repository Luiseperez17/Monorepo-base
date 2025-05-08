import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConteoComponent } from './info-conteo.component';

describe('InfoConteoComponent', () => {
  let component: InfoConteoComponent;
  let fixture: ComponentFixture<InfoConteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoConteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
