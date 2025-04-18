import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUpdateComponent } from './job-update.component';

describe('JobUpdateComponent', () => {
  let component: JobUpdateComponent;
  let fixture: ComponentFixture<JobUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
