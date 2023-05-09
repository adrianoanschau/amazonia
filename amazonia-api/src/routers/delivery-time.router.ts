import { Application } from 'express';
import { Router } from '../core/interfaces/router';
import { deliveryTimeSchema } from '../validation/delivery-time.schema';
import { DeliveryTimeService } from '../services/delivery-time.service';

class DeliveryTimeRouter implements Router {
  constructor(private readonly service: DeliveryTimeService) {}

  init(application: Application) {
    application.get('/delivery-time', (req, res) => {
      const { error, value } = deliveryTimeSchema.validate(req.query);
      if (error) throw new Error('Invalid data');

      res.json(this.service.calculate(value));
    });
  }
}

export const deliveryTimeRouter = new DeliveryTimeRouter(
  new DeliveryTimeService()
);
