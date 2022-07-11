import { PaymentResource } from '.';
import { TOSS_PAYMENTS_API_BASE_URL, TOSS_PAYMENTS_TEST_KEY } from '../../toss-payments';
import Axios from 'axios';

describe('billing resource test', () => {
  const paymentKey = 'jgN60L1adJYyZqmkKeP8gOKWLRy1d8bQRxB9lG5DnzWE7pM4';
  const orderId = 'XE490JfCtH5cThmsuBMJB';
  let paymentApi: PaymentResource;
  beforeAll(() => {
    const base64key = Buffer.from(TOSS_PAYMENTS_TEST_KEY + ':').toString('base64');
    console.log(base64key);
    const httpClient = Axios.create({
      baseURL: TOSS_PAYMENTS_API_BASE_URL,
      headers: {
        Authorization: `Basic ${base64key}`,
      },
    });
    paymentApi = new PaymentResource(httpClient);
  });

  it('인스턴스 생성', () => {
    expect(paymentApi).toBeTruthy();
  });

  it('GET PAYMENT', async () => {
    const payment = await paymentApi.get(paymentKey);
    console.log(payment);
    expect(payment.paymentKey).toBe(paymentKey);
    expect(payment.orderId).toBe(orderId);
  });

  it('GET PAYMENT BY ORDER_ID', async () => {
    const payment = await paymentApi.orders.get('XE490JfCtH5cThmsuBMJB');
    console.log(payment);
    expect(payment.paymentKey).toBe(paymentKey);
    expect(payment.orderId).toBe(orderId);
  });
});
