import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingComponent } from './greeting';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Greeting', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
