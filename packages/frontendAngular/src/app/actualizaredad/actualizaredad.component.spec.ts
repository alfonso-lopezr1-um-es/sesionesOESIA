import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaredadComponent } from './actualizaredad.component';

describe('ActualizaredadComponent', () => {
  let component: ActualizaredadComponent;
  let fixture: ComponentFixture<ActualizaredadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaredadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaredadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
