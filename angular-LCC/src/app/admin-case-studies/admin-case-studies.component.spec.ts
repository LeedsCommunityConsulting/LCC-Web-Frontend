import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaseStudiesComponent } from './admin-case-studies.component';

describe('AdminCaseStudiesComponent', () => {
  let component: AdminCaseStudiesComponent;
  let fixture: ComponentFixture<AdminCaseStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCaseStudiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCaseStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
