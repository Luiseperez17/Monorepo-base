import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCabeceraComponent } from './banner-cabecera.component';

describe('BannerCabeceraComponent', () => {
  let component: BannerCabeceraComponent;
  let fixture: ComponentFixture<BannerCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCabeceraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
