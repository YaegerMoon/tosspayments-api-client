import { PayMethod } from '../../enum';

/**
 * 정산 정보를 담고 있는 객체입니다.
 * {@link https://docs.tosspayments.com/reference#settlement-%EA%B0%9D%EC%B2%B4}
 */
export interface Settlement {
  /**
   * 상점아이디(MID)입니다.
   * 토스페이먼츠에서 상점을 구분하기 위해 발급한 고유 ID입니다.
   */
  mid: string;

  /**
   * 결제 건에 대한 고유한 키 값입니다.
   */
  paymentKey: string;

  /**
   * 거래 건에 대한 고유한 키 값입니다.
   * 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다.
   */
  transactionKey: string;

  /** 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. */
  orderId: string;

  /** 결제할 때 사용한 통화 단위입니다. 원화인 KRW만 사용합니다. */
  currency: string;

  /** 결제할 때 사용한 결제 수단입니다.  */
  method: PayMethod.EN | PayMethod.KR;

  /** 결제한 금액입니다. */
  amount: number;

  /** 할부 수수료 금액입니다. */
  interestFee: number;

  /** 결제 수수료의 상세 정보입니다. 수수료 상세 정보가 담긴 객체가 배열로 들어옵니다. */
  fees?: {
    type: 'BASE' | 'INSTALLMENT_DISCOUNT' | 'INSTALLMENT' | 'POINT_SAVING' | 'ETC';
    fee: number;
  }[];

  /** 결제 수수료의 공급가액입니다. */
  supplyAmount: number;

  /** 결제 수수료 부가세입니다. */
  vat: number;

  /** 지급 금액입니다. 결제 금액 amount에서 수수료인 fee를 제외한 금액입니다. */
  payOutAmount: number;

  /** 거래가 승인된 시점의 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm입니다. */
  approvedAt: string;

  /** 지급 금액 정산 기준일로, 결제가 일어난 날짜입니다. yyyy-MM-dd 형식입니다. */
  soldDate: string;

  /** 정산 지급 날짜 정보입니다. yyyy-MM-dd 형식입니다. */
  paidOutDate: string;
}
