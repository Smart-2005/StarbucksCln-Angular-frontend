import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreUsComponent } from './explore-us.component';

describe('ExploreUsComponent', () => {
  let component: ExploreUsComponent;
  let fixture: ComponentFixture<ExploreUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
