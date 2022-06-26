/**
 * 할인 프로모션 정보와 할부 혜택 정보를 담고 있는 객체입니다.
 * {@link https://docs.tosspayments.com/reference#cardpromotion-%EA%B0%9D%EC%B2%B4}
 */
export interface CardPromotion {
  /** 즉시 할인 이벤트 정보입니다. */
  discountCards: DiscountCard[];
  /** 카드사별 무이자 할부 정보입니다. */
  interestFreeCard: InterestFreeCard[];
}

interface Card {
  /** 카드사 코드입니다. */
  cardCompany: string;
  /** 할인 종료 날짜 입니다. yyyy-MM-dd 형식입니다. 해당 날짜의 23:59:59까지 행사가 유효합니다. */
  dueDate: string;
}

export interface DiscountCard extends Card {
  /** 할인을 적용받기 위해 결제해야 하는 최소 금액입니다. */
  minimumPaymentAmount: number;
  /** 할인을 적용받기 위해 결제할 수 있는 최대 결제 금액입니다. */
  maximumPaymentAmount: number;
  /** 즉시 할인 코드(카드사 고유 번호)로 결제할 때 함께 넘겨야 하는 값입니다. */
  discountCode: number;
  /** 할인 예정 금액입니다. */
  discountAmount: number;
  /** 남은 즉시 할인 프로모션 예산 금액입니다. 값이 0이면 즉시할인 노출 및 적용하지 않아야 합니다. */
  balance: number;
}

export interface InterestFreeCard extends Card {
  /** 무이자 할부가 가능한 개월 수가 배열로 표시됩니다. */
  installmentFreeMonths: number[];
  /** 해당 무이자 할부가 적용될 수 있는 최소 결제 금액 입니다. */
  mininumPaymentAmount: number;
}
