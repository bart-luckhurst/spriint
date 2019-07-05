import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEpicModalComponent } from './delete-epic-modal.component';

describe('DeleteEpicModalComponent', () => {
  let component: DeleteEpicModalComponent;
  let fixture: ComponentFixture<DeleteEpicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEpicModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEpicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
