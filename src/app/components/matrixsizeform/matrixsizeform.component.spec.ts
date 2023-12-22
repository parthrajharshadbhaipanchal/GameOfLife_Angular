import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixsizeformComponent } from './matrixsizeform.component';

describe('MatrixsizeformComponent', () => {
  let component: MatrixsizeformComponent;
  let fixture: ComponentFixture<MatrixsizeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixsizeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatrixsizeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
