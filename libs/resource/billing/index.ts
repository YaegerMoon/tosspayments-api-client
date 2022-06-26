import { AxiosInstance } from 'axios';
import { join } from 'path';
import { Billing, RequestBillingApproveBody, RequestBillingAuthByCustomerKey } from './type';

export class BillingResource {
  private path = 'billing';
  constructor(private httpClient: AxiosInstance) {}

  public get authorizations() {
    return {
      customerKey: this.requestBillingKeyByCustomerKey,
      authKey: this.requestBillingKeyByAuthKey,
    };
  }

  /**
   * 고객을 특정하는 customerKey와 연결할 빌링키 발급을 요청합니다.
   * {@link https://docs.tosspayments.com/reference#customerkey%EB%A1%9C-%EC%B9%B4%EB%93%9C-%EC%9E%90%EB%8F%99-%EA%B2%B0%EC%A0%9C-%EB%B9%8C%EB%A7%81%ED%82%A4-%EB%B0%9C%EA%B8%89-%EC%9A%94%EC%B2%AD}
   * @param body Request Body Parameters
   * @returns customerKey로 카드 자동 결제 요청에 성공했다면 Billing 객체가 돌아옵니다.
   */
  private async requestBillingKeyByCustomerKey(body: RequestBillingAuthByCustomerKey) {
    const url = join(this.path, 'authorizations', 'card');
    const { data: billing } = await this.httpClient.post<Billing>(url, body);
    return billing;
  }

  /**
   * requestBillingAuth 호출 후 쿼리 파라미터로 돌아오는 authKey로 빌링키 발급을 요청합니다.
   * {@link https://docs.tosspayments.com/reference#authkey%EB%A1%9C-%EC%B9%B4%EB%93%9C-%EC%9E%90%EB%8F%99-%EA%B2%B0%EC%A0%9C-%EB%B9%8C%EB%A7%81%ED%82%A4-%EB%B0%9C%EA%B8%89-%EC%9A%94%EC%B2%AD}
   * @param authKey 자동 결제 등록창 호출이 성공하면 리다이렉트 URL에 쿼리 파라미터(Query Parameter)로 포함되어 돌아오는 인증 키 값입니다.
   * @param customerKey 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID입니다. 이 값에 빌링키가 연결됩니다. 영문 대소문자, 숫자, 특수문자 -, _, =, ., @ 로 최소 2자 이상 최대 255자 이하여야 합니다.
   * @returns authKey로 카드 자동 결제 빌링키 발급 요청에 성공했다면 Billing 객체가 돌아옵니다.
   */
  private async requestBillingKeyByAuthKey(authKey: string, customerKey: string) {
    const url = join(this.path, 'authorizations', 'issue');
    const { data: billing } = await this.httpClient.post<Billing>(url, { authKey, customerKey });
    return billing;
  }

  /**
   * 발급받은 billingKey로 카드 자동 결제 승인을 요청합니다.
   * {@link https://docs.tosspayments.com/reference#%EC%B9%B4%EB%93%9C-%EC%9E%90%EB%8F%99-%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8-%EC%9A%94%EC%B2%AD}
   * @param billingKey 발급된 빌링키 정보입니다. 고객의 결제 정보로 사용됩니다.
   * @param body Request Body 파라미터
   */
  async requestApprove(billingKey: string, body: RequestBillingApproveBody) {
    const { data: billing } = await this.httpClient.post<Billing>(`/${this.path}/${billingKey}`, body);
    return billing;
  }
}
