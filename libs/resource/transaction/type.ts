import { PAYMENT_STATUS } from '../../enum';

export interface TransactionQueryParams {
  /** 조회를 시작하고 싶은 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'hh:mm:ss.SSS를 사용합니다. */
  startDate: string;
  /** 조회를 마치고 싶은 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'hh:mm:ss.SSS를 사용합니다. */
  endDate: string;

  /** 특정 결제 건 이후의 기록을 조회할 때 사용합니다. transactionKey 값을 전달합니다.  */
  startingAfter?: string;

  /** 한 번에 응답받을 기록의 개수입니다. 기본값은 100이고 설정할 수 있는 최대값은 10000입니다. */
  limit: number;
}

/**
 * 거래 정보를 담고 있는 객체입니다.
 * 하나의 결제(Payment) 건에 대해 여러 번의 거래가 일어날 수 있습니다.
 * 결제 승인, 취소, 부분 취소가 이루어질 때마다 각각의 거래 정보를 담은 Transaction 객체가 만들어지고 개별 transactionKey를 가지게 됩니다.
 * 거래 조회 API를 호출하면 지정한 기간 동안 생긴 모든 Transaction 객체들이 배열로 돌아옵니다.
 * {@link https://docs.tosspayments.com/reference#%EA%B1%B0%EB%9E%98}
 */
export interface Transaction {
  /** 상점아이디(MID)입니다. 토스페이먼츠에서 상점을 구분하기 위해 발급한 고유 ID입니다 */
  mid: string;

  /** 거래 건에 대한 고유한 키 값입니다. 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다. */
  transactionKey: string;

  /** 결제 건에 대한 고유한 키 값입니다. */
  paymentKey: string;

  /** 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. */
  orderId: string;

  /** 결제할 때 사용한 통화 단위입니다. 원화인 KRW만 사용합니다. */
  currency: string;

  /** 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID입니다.
   *  이 값에 빌링키가 연결됩니다. 영문 대소문자, 숫자, 특수문자 -, _, =, ., @로 최소 2자 이상 최대 255자 이하여야 합니다.
   */
  customerKey: string;

  /** 결제할 때 사용한 결제 수단입니다. 카드, 가상계좌, 휴대폰, 계좌이체, 상품권(문화상품권, 도서문화상품권, 게임문화상품권) 중 하나입니다. */
  method: string;

  /** 에스크로 사용 여부입니다. */
  useEscrow: boolean;

  /** 결제한 금액입니다. */
  amount: number;

  /** 결제 처리 상태입니다. */
  status: PAYMENT_STATUS;

  /**
   * 거래가 처리된 시점의 날짜와 시간 정보입니다.
   *  ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm으로 돌아옵니다.
   */
  transactionAt: string;
}
