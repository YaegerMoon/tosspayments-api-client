/**
 * 자동 결제에 사용할 결제 수단이 인증되어 등록되었을 때 돌아오는 객체입니다.
 * 등록된 카드 정보와 발급된 billingKey가 포함되어 있습니다. billingKey로 자동 결제 요청 API를 호출할 수 있습니다.
 * {@link https://docs.tosspayments.com/reference#billing-%EA%B0%9D%EC%B2%B4}
 */
export interface Billing {
  /** 상점아이디(MID)입니다. 토스페이먼츠에서 상점을 구분하기 위해 발급한 고유 ID입니다. */
  mid: string;
  /** 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID입니다. 이 값에 빌링키가 연결됩니다. */
  customerKey: string;
  /** 자동 결제 수단이 인증된 시점의 날짜와 시간 정보입니다. */
  authenticatedAt: string;
  /** 결제할 때 사용한 결제 수단으로 현재 지원하는 자동 결제 결제 수단은 카드이기 때문에 카드로 값이 고정되어 돌아옵니다. */
  method: string;
  /** 카드 정보를 대신해서 자동 결제를 요청할 때 사용되는 값입니다. 고객의 고유 ID인 customerKey와 연결됩니다. */
  billingKey: string;
  /** 발급된 빌링키와 연결된 카드 정보입니다. */
  card: {
    /** 카드사 코드입니다. */
    company: string;
    /** 카드 번호입니다. 번호의 일부는 마스킹 되어 있습니다. */
    number: string;
    /** 카드 종류입니다. 신용, 체크, 기프트 중 하나입니다. */
    cardType: string;
    /** 카드의 소유자 타입입니다. 개인, 법인 중 하나입니다. */
    ownerType: string;
  };
}
