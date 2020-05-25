import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildeductionComponent } from './detaildeduction.component';

describe('DetaildeductionComponent', () => {
  let component: DetaildeductionComponent;
  let fixture: ComponentFixture<DetaildeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
