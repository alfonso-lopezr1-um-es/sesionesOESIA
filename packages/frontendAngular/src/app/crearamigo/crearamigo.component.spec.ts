import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearamigoComponent } from './crearamigo.component';

describe('CrearamigoComponent', () => {
  let component: CrearamigoComponent;
  let fixture: ComponentFixture<CrearamigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearamigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearamigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
