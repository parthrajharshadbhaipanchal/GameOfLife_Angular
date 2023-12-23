import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolmatrixComponent } from './golmatrix.component';

describe('GolmatrixComponent', () => {
  let component: GolmatrixComponent;
  let fixture: ComponentFixture<GolmatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GolmatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GolmatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
