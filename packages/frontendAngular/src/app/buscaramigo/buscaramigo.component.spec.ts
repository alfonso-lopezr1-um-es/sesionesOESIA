import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaramigoComponent } from './buscaramigo.component';

describe('BuscaramigoComponent', () => {
  let component: BuscaramigoComponent;
  let fixture: ComponentFixture<BuscaramigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaramigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaramigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
