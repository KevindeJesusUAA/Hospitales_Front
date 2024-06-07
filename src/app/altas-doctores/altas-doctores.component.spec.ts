import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasDoctoresComponent } from './altas-doctores.component';

describe('AltasDoctoresComponent', () => {
  let component: AltasDoctoresComponent;
  let fixture: ComponentFixture<AltasDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltasDoctoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltasDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
