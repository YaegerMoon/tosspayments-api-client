import { AxiosInstance } from 'axios';
import { join } from 'path';
import { Resource } from '../resource';
import { KeyInPaymentBody, Payment, PaymentCancelBody, VAccountReqBody } from './type';

/**
 * 결제와 관련한 모든 API
 */
export class PaymentResource implements Resource {
  readonly path = 'payments';
  constructor(private httpClient: AxiosInstance) {}

  /**
   * {paymentKey}에 해당하는 결제를 검증하고 승인합니다.
   * @param paymentKey 결제 건에 대한 고유한 키값입니다.
   * @param amount 결제할 금액입니다.
   * @param orderId 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
   * @returns 결제 승인 요청에 성공했다면 Payment 객체가 돌아옵니다.
   * {@link https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8}
   * */
  async confirm(paymentKey: string, amount: number, orderId: string) {
    const url = join(this.path, paymentKey);
    const reqBody = { amount, orderId };
    const { data: payment } = await this.httpClient.post<Payment>(url, reqBody);
    return payment;
  }

  /**
   * 승인된 결제를 paymentKey로 조회합니다.
   * @param paymentKey 결제 건에 대한 고유한 키값입니다.
   * @returns 결제 조회 요청에 성공했다면 Payment 객체가 돌아옵니다.
   * ${@link https://docs.tosspayments.com/reference#paymentkey%EB%A1%9C-%EA%B2%B0%EC%A0%9C-%EC%A1%B0%ED%9A%8C}
   */
  async get(paymentKey: string) {
    const url = join(this.path, paymentKey);
    const { data: payment } = await this.httpClient.get<Payment>(url);
    return payment;
  }

  /**
   * 승인된 결제를 orderId로 조회합니다.
   * @param orderId 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
   * @returns 결제 조회 요청에 성공했다면 Payment 객체가 돌아옵니다.
   * {@link https://docs.tosspayments.com/reference#orderid%EB%A1%9C-%EA%B2%B0%EC%A0%9C-%EC%A1%B0%ED%9A%8C}
   */
  private async retrieveByOrderId(orderId: string) {
    const url = join(this.path, 'orders', orderId);
    const { data: payment } = await this.httpClient.get<Payment>(url);
    return payment;
  }

  get orders() {
    return {
      get: this.retrieveByOrderId.bind(this),
    };
  }

  /**
   * 승인된 결제를 paymentKey로 취소합니다.
   * @param paymentKey 결제 건에 대한 고유한 키값입니다.
   * @returns 결제 취소 요청에 성공했다면 Payment 객체의 cancels 필드에 취소 객체가 배열로 돌아옵니다.
   * {@link https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%B7%A8%EC%86%8C}
   */
  async cancel(paymentKey: string, body: PaymentCancelBody) {
    const url = join(this.path, paymentKey, 'cancel');
    const { data: payment } = await this.httpClient.post<Payment>(url, body);
    return payment;
  }

  /**
   * 결제할 카드 정보와 orderId로 결제를 요청합니다.
   * @param body Request Body Parameters
   * @returns 카드 정보 결제 요청에 성공했다면 Payment 객체가 돌아옵니다.
   * {@link https://docs.tosspayments.com/reference#%EC%B9%B4%EB%93%9C-%EC%A0%95%EB%B3%B4-%EA%B2%B0%EC%A0%9C}
   */
  async keyIn(body: KeyInPaymentBody) {
    const url = join(this.path, 'key-in');
    const { data: payment } = await this.httpClient.post<Payment>(url, body);
    return payment;
  }

  /**
   * 구매자가 원하는 은행의 가상계좌 발급을 요청합니다.
   * @param body Request Body Parameters
   * @returns 가상계좌 발급 요청에 성공했다면 virtualAccount 필드에 값이 있는 Payment 객체가 돌아옵니다.
   * {@link https://docs.tosspayments.com/reference#%EA%B0%80%EC%83%81%EA%B3%84%EC%A2%8C-%EB%B0%9C%EA%B8%89-%EC%9A%94%EC%B2%AD}
   */
  async requestVirtualBank(body: VAccountReqBody) {
    const url = 'virtual-accounts';
    const { data: payment } = await this.httpClient.post(url, body);
    return payment;
  }
}
