import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreEntradaComponent } from './cre-entrada.component';

describe('CreEntradaComponent', () => {
  let component: CreEntradaComponent;
  let fixture: ComponentFixture<CreEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreEntradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
