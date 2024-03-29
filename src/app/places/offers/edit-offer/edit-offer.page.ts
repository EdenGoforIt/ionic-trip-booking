import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Place } from '../../places.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
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
      this.form = new FormGroup({
        title: new FormControl(this.place.title, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        description: new FormControl(this.place.description, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    });
  }

  onEditOffer(): void {
    if (this.form.invalid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating place ...',
      })
      .then((loadingEl) => {
        loadingEl.present();
      });

    this.placesService
      .updateOffer(
        this.place.id,
        this.form.value.title,
        this.form.value.description
      )
      .subscribe(
        () => {
          this.loadingCtrl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'An error occured',
              message: 'place could not be fetched. Please try again',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['places/tabs/offers']);
                  },
                },
              ],
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      );
  }
}
