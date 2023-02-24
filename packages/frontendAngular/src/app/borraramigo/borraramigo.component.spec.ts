import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorraramigoComponent } from './borraramigo.component';

describe('BorraramigoComponent', () => {
  let component: BorraramigoComponent;
  let fixture: ComponentFixture<BorraramigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorraramigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorraramigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
