import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoresedadComponent } from './mayoresedad.component';

describe('MayoresedadComponent', () => {
  let component: MayoresedadComponent;
  let fixture: ComponentFixture<MayoresedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayoresedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayoresedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
