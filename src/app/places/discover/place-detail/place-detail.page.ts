import { BookingService } from './../../../bookings/booking.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Place } from './../../places.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  private readonly destroy$ = new Subject<void>();
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
      }
      const id = +paramMap.get('placeId');
      this.placesService
        .getPlace(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((place) => (this.place = place));
    });
  }
  onBookPlace(): void {
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
        },
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        console.log('resultData', resultData);
        this.loadingCtrl
          .create({ message: 'Creating Booking' })
          .then((loadingEl) => {
            loadingEl.present();
            this.bookingService
              .add(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                resultData.data.data.firstName,
                resultData.data.data.lastName,
                +resultData.data.data.guestNumber,
                new Date(resultData.data.data['date-from']),
                new Date(resultData.data.data['date-to'])
              )
              .subscribe(() => {
                loadingEl.dismiss();
              });
          });
      });
  }
}
