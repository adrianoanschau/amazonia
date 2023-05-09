import { DeliveryTimeData } from '../data/delivery-time.data';
import { DeliveryTimeRequest } from '../validation/delivery-time.schema';

export class DeliveryTimeService {
  constructor(private readonly deliveryTimeData: DeliveryTimeData) {}

  calculate({
    start_on,
    object_location,
    delivery_on,
  }: DeliveryTimeRequest): any {
    return {};
  }
}
