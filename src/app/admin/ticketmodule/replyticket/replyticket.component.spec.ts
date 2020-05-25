import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyticketComponent } from './replyticket.component';

describe('ReplyticketComponent', () => {
  let component: ReplyticketComponent;
  let fixture: ComponentFixture<ReplyticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
