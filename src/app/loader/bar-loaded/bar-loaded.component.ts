import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-bar-loaded',
  templateUrl: './bar-loaded.component.html',
  styleUrls: ['./bar-loaded.component.scss'],
})
export class BarLoadedComponent implements OnInit {
  kgPlates: number[] = [25, 20, 15, 10, 5, 2.5, 1.25, 1, 0.5, 0.25];

  constructor(public loaderService: LoaderService) { }

  ngOnInit() {}

}
