import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPersonalesComponent } from './citas-personales.component';

describe('CitasPersonalesComponent', () => {
  let component: CitasPersonalesComponent;
  let fixture: ComponentFixture<CitasPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasPersonalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
