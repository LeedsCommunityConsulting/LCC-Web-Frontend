import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccanciesComponent } from './vaccancies.component';

describe('VaccanciesComponent', () => {
  let component: VaccanciesComponent;
  let fixture: ComponentFixture<VaccanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccanciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
