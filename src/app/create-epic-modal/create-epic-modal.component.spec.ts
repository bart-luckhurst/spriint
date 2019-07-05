import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEpicModalComponent } from './create-epic-modal.component';

describe('CreateEpicModalComponent', () => {
  let component: CreateEpicModalComponent;
  let fixture: ComponentFixture<CreateEpicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEpicModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEpicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
