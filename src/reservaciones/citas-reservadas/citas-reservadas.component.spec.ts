import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasReservadasComponent } from './citas-reservadas.component';

describe('CitasReservadasComponent', () => {
  let component: CitasReservadasComponent;
  let fixture: ComponentFixture<CitasReservadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasReservadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasReservadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
