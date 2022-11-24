import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from '../places.model';
import { PlacesService } from './../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: Place[];
  private readonly destroy$ = new Subject<void>();
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.placesService.places
      .pipe(takeUntil(this.destroy$))
      .subscribe((places) => (this.places = places));
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>): void {
    console.log(event.detail?.value);
    if (event.detail?.value === 'all') {
      this.placesService.places
        .pipe(takeUntil(this.destroy$))
        .subscribe((places) => (this.places = places.filter((x) => x.id > 0)));
    } else {
      this.placesService.places
        .pipe(takeUntil(this.destroy$))
        .subscribe((places) => (this.places = places.filter((x) => x.id > 3)));
    }
  }
}
