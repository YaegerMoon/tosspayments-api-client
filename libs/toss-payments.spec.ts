import { TossPaymentsAPI, TOSS_PAYMENTS_API_BASE_URL } from './toss-payments';

describe('billing resource test', () => {
  let tossPaymentsApi: TossPaymentsAPI;
  beforeAll(() => {
    tossPaymentsApi = new TossPaymentsAPI({ baseURL: TOSS_PAYMENTS_API_BASE_URL, secretKey: 'key' });
  });

  it('instance init', () => {
    expect(tossPaymentsApi).toBeTruthy();
  });
});
