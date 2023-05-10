import { Router } from 'express';
import { deliveryTimeSchema } from '../validation/delivery-time.schema';
import { DeliveryTimeService } from '../services/delivery-time.service';

export class DeliveryTimeRouter {
  #router: Router;

  constructor(private readonly service: DeliveryTimeService) {
    this.#router = Router();

    this.#router.get('/delivery-time', (req, res) => {
      const { error, value } = deliveryTimeSchema.validate(req.query);
      if (error) throw error;

      res.json(this.service.getBetterRoute(value));
    });
  }

  getRouter() {
    return this.#router;
  }
}
