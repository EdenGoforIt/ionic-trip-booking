import { Router } from '@angular/router';
import { PlacesService } from './../places.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private readonly destroy$ = new Subject<void>();
  constructor(private placesService: PlacesService, private router: Router) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.placesService.places
      .pipe(takeUntil(this.destroy$))
      .subscribe((offers) => (this.offers = offers));
  }
  onEdit(offerId: number, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }
  onDelete(offerId: number): void {}
}
