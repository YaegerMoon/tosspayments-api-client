import Axios from 'axios';
import { TransactionResource } from '.';
import { TOSS_PAYMENTS_API_BASE_URL } from '../../toss-payments';

describe('billing resource test', () => {
  let transaction: TransactionResource;
  beforeAll(() => {
    const base64key = Buffer.from('secretKey' + ':', 'utf-8').toString('base64');
    const httpClient = Axios.create({
      baseURL: TOSS_PAYMENTS_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${base64key}`,
      },
    });
    transaction = new TransactionResource(httpClient);
  });

  it('instance init', () => {
    expect(transaction).toBeTruthy();
  });
});
