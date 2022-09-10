import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackingCourierMessagingPage } from './tracking-courier-messaging.page';

describe('TrackingCourierMessagingPage', () => {
  let component: TrackingCourierMessagingPage;
  let fixture: ComponentFixture<TrackingCourierMessagingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingCourierMessagingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingCourierMessagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
