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

export interface RequestBillingAuthByCustomerKey {
  /**
   * 상점에서 고객을 구분하기 위해 발급한 고유 ID입니다.
   * 이 값에 빌링키가 연결됩니다.
   * 영문 대소문자, 숫자, 특수문자 -, _, =, ., @ 로 최소 2자 이상 최대 255자 이하여야 합니다.
   */
  customerKey: string;

  /** 카드번호 */
  cardNumber: string;

  /** 카드 유효연도입니다. */
  cardExpirationYear: string;

  /** 카드 유효 월입니다. */
  cardExpirationMonth: string;

  /** 카드 비밀번호 앞 두자리입니다. */
  cardPassword?: string;

  /** 카드 소유자 정보입니다. 생년월일 6자리(YYMMDD) 혹은 사업자등록번호 10자리가 들어갑니다. */
  customerIdentityNumber: string;

  /** 고객 이름입니다. */
  customerName: string;

  /** 고객의 이메일 주소입니다. 결제 결과를 알려줄 때 사용합니다. */
  customerEmail: string;

  /** 해외 카드로 결제하는 경우 3DS 인증 적용을 위해 사용합니다. */
  vbv?: {
    /** 3D Secure 인증 세션에 대한 인증 값입니다. */
    cavv: string;
    /** 트랜잭션 ID 입니다. */
    xid: string;
    /** 3DS 인증 결과에 대한 코드 값입니다. */
    eci: string;
  };
}

export interface RequestBillingApproveBody {
  /** 결제할 금액입니다. (필수) */
  amount: number;
  /**
   * 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID입니다.(필수)
   * 이 값에 빌링키가 연결됩니다. 영문 대소문자, 숫자, 특수문자 -, _, =, ., @로 최소 2자 이상 최대 255자 이하여야 합니다.
   */
  customerKey: string;
  /**
   * 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. (필수)
   * 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
   */
  orderId: string;
  /**
   * 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다.
   * 최소 1글자 이상 100글자 이하여야 합니다.
   */
  orderName: string;
  /**
   * 고객의 이메일 주소입니다. 결제 결과를 알려줄 때 사용합니다. (필수)
   */
  customerEmail?: string;
  /** 고객 이름입니다. */
  customerName?: string;
  /** 고객의 휴대폰 번호입니다. */
  customerMobilePhone?: string;
  /** 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다.
   * 면세 상점 혹은 복합 과세 상점일 때만 설정한 금액이 적용되고,일반 과세 상점인 경우에는 적용되지 않습니다.
   */
  taxFreeAmount?: number;
  /**
   * 할부 개월 수입니다. 값은 2부터 12까지 사용할 수 있습니다.
   * 0이 들어가는 경우 할부가 아닌 일시불로 결제됩니다. 값을 넣지 않으면 일시불입니다.
   */
  cardInstallmentPlan?: number;
}
