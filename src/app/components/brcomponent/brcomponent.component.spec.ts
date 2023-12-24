import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrcomponentComponent } from './brcomponent.component';

describe('BrcomponentComponent', () => {
  let component: BrcomponentComponent;
  let fixture: ComponentFixture<BrcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
