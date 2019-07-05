import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEpicModalComponent } from './edit-epic-modal.component';

describe('EditEpicModalComponent', () => {
  let component: EditEpicModalComponent;
  let fixture: ComponentFixture<EditEpicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEpicModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEpicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
