import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDirectoryComponent } from './phone-directory.component';

describe('PhoneDirectoryComponent', () => {
  let component: PhoneDirectoryComponent;
  let fixture: ComponentFixture<PhoneDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneDirectoryComponent]
    });
    fixture = TestBed.createComponent(PhoneDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
