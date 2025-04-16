import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticurrencyComponent } from './multicurrency.component';

describe('MulticurrencyComponent', () => {
  let component: MulticurrencyComponent;
  let fixture: ComponentFixture<MulticurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulticurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulticurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
