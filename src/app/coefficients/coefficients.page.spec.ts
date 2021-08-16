import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoefficientsPage } from './coefficients.page';
import { CoeffService } from './coefficients.service';
import { FormsModule } from '@angular/forms';

describe('CoefficientsPage', () => {
  let component: CoefficientsPage;
  let fixture: ComponentFixture<CoefficientsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoefficientsPage ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CoefficientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import service', () => {
    const coeffService = fixture.debugElement.injector.get(CoeffService);
    expect(coeffService).toBeTruthy();
  });
});
