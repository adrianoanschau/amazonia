import { Router } from 'express';
import { deliveryTimeSchema } from '../validation/delivery-time.schema';
import { DeliveryTimeService } from '../services/delivery-time.service';

export class DeliveryTimeRouter {
  constructor(private readonly service: DeliveryTimeService) {}

  getRouter() {
    const router = Router();

    router.get('/delivery-time', (req, res) => {
      const { error, value } = deliveryTimeSchema.validate(req.query);
      if (error) throw new Error('Invalid data');

      res.json(this.service.calculate(value));
    });

    return router;
  }
}
