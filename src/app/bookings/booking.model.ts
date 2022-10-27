export class Booking {
  constructor(
    public id: number,
    public placeId: number,
    public userId: number,
    public placeTitle: string,
    public guestNumber: number
  ) {}
}
