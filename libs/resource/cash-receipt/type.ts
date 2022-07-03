/**
 * 현금영수증 발급 정보를 담고 있는 객체입니다.
 * {@link https://docs.tosspayments.com/reference#%ED%98%84%EA%B8%88%EC%98%81%EC%88%98%EC%A6%9D}
 */
export interface CashReceiptReqBody {
  /** 현금영수증을 발급할 금액입니다. */
  amount: number;

  /** 주문 건에 대한 ID입니다. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다. */
  orderId: string;

  /** 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최소 1글자 이상 100글자 이하여야 합니다. */
  orderName: string;

  /**
   * 현금영수증 발급을 위한 개인 식별 번호입니다.
   * 현금영수증 종류에 따라 휴대폰 번호, 주민등록번호, 사업자등록번호, 현금영수증 카드 번호 등을 입력할 수 있습니다.
   */
  registrationNumber: string;

  /**
   * 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나의 값입니다.
   */
  type: CashReceiptType;

  /** 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다. */
  taxFreeAmount?: number;

  /** 현금영수증을 발급할 새로운 사업자등록번호입니다. */
  businessNumber?: string;
}

export interface CashReceipt {
  /** 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. */
  orderId: string;
  /** 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최소 1글자 이상 100글자 이하여야 합니다. */
  orderName: string;
  /** 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나의 값입니다. */
  type: CashReceiptType;
  /** 현금영수증 발급 키입니다. 취소할 때 사용됩니다. */
  receiptKey: string;
  /** 현금영수증 승인번호입니다. */
  approvalNumber: string;
  /** 현금영수증이 발급된 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm으로 돌아옵니다. */
  approvedAt: string;
  /** 현금영수증을 취소한 경우 취소 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm으로 돌아옵니다. */
  canceledAt: string;
  /** 발행된 현금영수증을 확인할 수 있는 주소입니다. */
  receiptUrl: string;
}

type CashReceiptType = '소득공제' | '지출증빙';
