import { PaymentResource } from '.';
import { TOSS_PAYMENTS_API_BASE_URL } from '../../toss-payments';
import Axios from 'axios';

describe('billing resource test', () => {
  let payment: PaymentResource;
  beforeAll(() => {
    const base64key = Buffer.from('secretKey' + ':', 'utf-8').toString('base64');
    const httpClient = Axios.create({
      baseURL: TOSS_PAYMENTS_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${base64key}`,
      },
    });
    payment = new PaymentResource(httpClient);
  });

  it('instance init', () => {
    expect(payment).toBeTruthy();
  });
});
