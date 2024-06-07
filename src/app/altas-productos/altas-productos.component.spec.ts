import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasProductosComponent } from './altas-productos.component';

describe('AltasProductosComponent', () => {
  let component: AltasProductosComponent;
  let fixture: ComponentFixture<AltasProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltasProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
