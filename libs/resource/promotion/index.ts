import { AxiosInstance } from 'axios';
import { join } from 'path';
import { CardPromotion } from './type';
/**
 * 카드 혜택 API로 카드사별 할인 프로모션과 할부 혜택을 조회해서 고객에게 제공할 수 있습니다.
 * {@link https://docs.tosspayments.com/reference#%EC%B9%B4%EB%93%9C-%ED%98%9C%ED%83%9D}
 */
export class PromotionResource {
  private path = 'promotions';
  constructor(private httpClient: AxiosInstance) {}

  /**
   * 결제 타입 입니다. NORMAL(일반 결제), CONNECTPAY(커넥트페이) 중 하나입니다.
   * 일반 결제 연동에서는 CONNECTPAY를 사용하지 않습니다. 값이 없으면 기본 값은 NORMAL입니다.
   * @remark GET v1/promotions/card
   * @param payType 결제 타입 입니다. NORMAL(일반 결제), CONNECTPAY(커넥트페이) 중 하나입니다. 일반 결제 연동에서는 CONNECTPAY를 사용하지 않습니다. 값이 없으면 기본 값은 NORMAL입니다.
   * @returns 카드 혜택 조회 요청에 성공했다면 {@link CardPromotion} 객체가 돌아옵니다.
   */
  async retrieve(payType: 'NORMAL' | 'CONNECTPAY') {
    const url = join(this.path, 'card');
    const { data: promotion } = await this.httpClient.get<CardPromotion>(url, { params: { payType } });
    return promotion;
  }
}
