import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVaccancyComponent } from './admin-vaccancy.component';

describe('AdminVaccancyComponent', () => {
  let component: AdminVaccancyComponent;
  let fixture: ComponentFixture<AdminVaccancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVaccancyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVaccancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
