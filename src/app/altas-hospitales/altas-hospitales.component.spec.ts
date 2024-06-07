import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasHospitalesComponent } from './altas-hospitales.component';

describe('AltasHospitalesComponent', () => {
  let component: AltasHospitalesComponent;
  let fixture: ComponentFixture<AltasHospitalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltasHospitalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltasHospitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
