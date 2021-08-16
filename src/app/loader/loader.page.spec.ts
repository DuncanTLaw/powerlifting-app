import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BarLoadedComponent } from './bar-loaded/bar-loaded.component';
import { BarLoaderComponent } from './bar-loader/bar-loader.component';

import { LoaderPage } from './loader.page';
import { LoaderService } from './loader.service';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPage, BarLoadedComponent, BarLoaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import service', () => {
    const loaderService = fixture.debugElement.injector.get(LoaderService);
    expect(loaderService).toBeTruthy();
  });
});
