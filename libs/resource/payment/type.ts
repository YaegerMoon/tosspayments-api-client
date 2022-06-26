import { BankCode, PayMethod, PAYMENT_STATUS, REFUND_STATUS, CardCompanyCode } from '../../enum';

export interface VAccountReqBody {
  /** 결제할 금액입니다. */
  amount: number;
  /** 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다. */
  orderId: string;
  /** 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최소 1글자 이상 100글자 이하여야 합니다. */
  orderName: string;
  /** 입금할 고객 이름입니다. 최소 1글자 이상 최대 10글자 이하여야 합니다. */
  customerName: string;
  /** 가상계좌를 발급할 은행입니다.  */
  bank: BankCode.KR | BankCode.EN;
  /**
   * 가상계좌 타입을 나타냅니다. 일반, 고정 중 하나입니다. 값이 없으면 일반 가상계좌로 발급됩니다.
   */
  accountType?: AccountType;
  /**
   * 고정 가상계좌를 사용하는 고객과 매칭시킨 계좌의 고유한 키값으로, 특정 고객에게 같은 가상계좌를 발급할 때 사용됩니다.
   * 같은 가상계좌를 다시 발급하려면 accountType을 고정으로 설정한 뒤 처음 고정 가상계좌를 발급할 때 사용했던 accountKey를 함께 넘겨주어야 합니다.
   */
  accountKey?: string;
  /**
   * 가상계좌가 유효한 시간을 의미합니다.
   * 값을 넣지 않으면 기본값 168시간(7일)으로 설정됩니다. 설정할 수 있는 최대값은 720시간(30일)입니다.
   * validHours와 dueDate 중 하나만 사용할 수 있습니다.
   */
  validHours?: number;
  /**
   * 입금 기한입니다. 현재 시간을 기준으로 720시간(30일) 이내의 특정 시점으로 입금 기한을 직접 설정하고 싶을 때 사용합니다.
   * 720시간 이후로 기한을 설정하면 에러가 발생합니다.
   * ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss를 사용합니다.
   */
  dueDate?: string;
  /** 가상계좌 웹훅 URL 주소입니다. */
  virtualAccountCallbackUrl?: string;
  /** 고객의 이메일 주소입니다. */
  customerEmail?: string;
  /** 고객의 휴대폰 번호입니다. */
  customerMobilePhone?: string;
  /** 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다. */
  taxFreeAmount?: number;
  /**
   * 에스크로 사용 여부입니다.
   * 값을 넣지 않으면 기본값인 false로 설정되고 사용자가 에스크로 결제 여부를 선택합니다.
   */
  useEscrow?: boolean;
  /** 현금영수증 발급 정보를 담는 객체입니다. */
  cashReceipt?: {
    /**
     * 현금영수증 발급 용도입니다.
     * 소득공제, 지출증빙 중 하나의 값을 넣으면 해당 용도가 선택된 상태로 결제창이 열립니다.
     * 미발행을 넣으면 결제창에서 현금영수증 발급 용도를 선택할 수 없습니다.
     */
    type: CashReciiptType;
    /** 현금영수증 신청 번호입니다. */
    registrationNumber: string;
    /** 현금영수증을 발급할 새로운 사업자등록번호입니다. */
    businessNumber: string;
  };

  /**
   * 각 상품에 대한 상세 정보를 담는 배열입니다.
   * 예를 들어 사용자가 세 가지 종류의 상품을 구매했다면 길이가 3인 배열이어야 합니다.
   * 에스크로 결제를 사용할 때만 필요한 파라미터입니다.
   */
  escrowProducts?: EscrowProduct[];

  /** 결제할 때 사용할 통화 단위입니다. 값을 넣지 않으면 기본값은 KRW입니다. 원화인 KRW만 사용합니다. */
  currency: string;
}

export interface PaymentCancelBody {
  cancelReason: string;
  cancelAmount?: number;
  currency?: string;
  refundReceiveAccount?: {
    accountNumber: string;
    bank: string;
    holderName: string;
  };
  refundableAmount: number;
  taxAmount: number;
  taxFreeAmount: number;
}

/** 현금영수증 발급 용도입니다. */
type CashReciiptType = '소득공제' | '지출증빙' | '미발행';

/**
 * 에스크로 결제한 상품에 대한 상세 정보 객체 입니다..
 */
export interface EscrowProduct {
  /** 상품의 ID입니다. 이 값은 유니크해야 합니다 */
  id: string;
  /** 상품 이름입니다. */
  name: string;
  /** 상점에서 사용하는 상품 관리 코드입니다. */
  code: string;
  /** 상품의 가격입니다. 전체를 합한 가격이 아닌 상품의 개당 가격입니다. */
  unitPrice: number;
  /** 상품 구매 수량입니다. */
  quantity: number;
}

/**
 * @remarks
 * 일반 - 임시적으로 발급되어 고객이 입금한 뒤에는 더 이상 사용할 수 없는 일반적인 가상계좌 타입입니다.
 * @remarks
 * 고정 - 같은 가상계좌를 여러 번 사용해야 하는 특수한 경우를 위해 지원되는 가상계좌 타입입니다.
 * 고정 가상계좌를 사용하는 상점으로 계약되어 있어야 사용할 수 있습니다. accountKey 파라미터와 함께 요청을 보내면 같은 계좌를 다시 발급할 수 있습니다.
 * ${@link https://docs.tosspayments.com/reference#payment-%EA%B0%9D%EC%B2%B4}
 * */
type AccountType = '일반' | '고정';

export interface Payment {
  /**
   * Payment 객체의 응답 버전입니다.
   */
  version: string;
  /**
   * 결제 건에 대한 고유한 키 값입니다.
   */
  paymentKey: string;
  /**
   * 결제 타입 정보입니다.
   * NORMAL(일반 결제), BILLING(자동 결제), BRANDPAY(브랜드페이) 중 하나입니다.
   */
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY';
  /**
   * 상점에서 주문 건에 대해 발급한 고유 ID입니다.
   */
  orderId: string;
  /**
   * 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최소 1글자 이상 100글자 이하여야 합니다.
   */
  orderName: string;

  /**
   * 상점아이디(MID)입니다.
   * 토스페이먼츠에서 상점을 구분하기 위해 발급한 고유 ID입니다.
   */
  mid: string;

  /** 결제할 때 사용한 통화 단위입니다. 원화인 KRW만 사용합니다. */
  currency: string;

  /** 결제할 때 사용한 결제 수단입니다.
   * 카드, 가상계좌, 휴대폰, 계좌이체, 상품권(문화상품권, 도서문화상품권, 게임문화상품권), 간편결제 중 하나입니다. */
  method: PayMethod.KR | PayMethod.EN;

  /** 총 결제 금액입니다. */
  totalAmount: number;

  /** 취소할 수 있는 금액(잔고)입니다. */
  balanceAmount: number;

  /** 결제 처리 상태입니다.  */
  status: PAYMENT_STATUS;

  /** 결제 요청이 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss.SSS±hh:mm으로 돌아옵니다. */
  requestedAt: string;

  /** 결제 승인이 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss.SSS±hh:mm으로 돌아옵니다. */
  approvedAt: string;

  /** 에스크로 사용 여부입니다. */
  useEscrow: boolean;

  /** 거래 건에 대한 고유한 키 값입니다. 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다. */
  transactionKey: string;

  /**
   * 마지막 거래 건에 대한 고유한 키 값입니다. 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다.
   * 예를 들어 결제 승인 후 부분 취소를 두 번 했다면 마지막 부분 취소 거래 건에 대한 키 값이 할당됩니다.
   */
  lastTransactionKey: string;

  /**
   * 공급가액입니다
   */
  suppliedAmount: number;

  /**
   * 부가세입니다. (결제 금액 amount - 면세 금액 taxFreeAmount) / 11 후 소수점 첫째 자리에서 반올림해서 계산합니다.
   */
  vat: number;

  /** 문화비로 지출했는지 여부입니다. (도서구입, 공연 티켓, 박물관·미술관 입장권 등) */
  cultureExpense: boolean;

  /** 전체 결제 금액 중 면세 금액입니다. 값이 0으로 돌아왔다면 전체 결제 금액이 과세 대상입니다. */
  taxFreeAmount: number;

  cancels: Cancel[] | null;

  isPartialCancelable: boolean;

  card: Card | null;

  virtualAccount: VirtualAccount | null;

  secret: string | null;

  mobilePhone: {
    /** 결제에 사용한 휴대폰 번호입니다. */
    customerMobilePhone: string;
    /** 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다. */
    settlementStatus: 'INCOMPLETE' | 'COMPLETE';
    /** 휴대폰 결제 내역 영수증을 확인할 수 있는 주소입니다. */
    receiptUrl: string;
  } | null;

  giftCertificate: {
    /** 결제 승인번호입니다. */
    approveNo: string;

    /** 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다. */
    settlementStatus: 'INCOMPLETE' | 'COMPLETE';
  } | null;

  transfer: {
    bank: BankCode.KR | BankCode.EN;
    settlemnetStatus: 'INCOMPLETE' | 'COMPLETE';
  } | null;

  /** 발행된 영수증 정보입니다. */
  receipt: {
    /** 영수증을 확인할 수 있는 주소입니다. */
    url: string;
  };

  /** 간편결제 결제 정보를 담은 객체입니다. */
  easyPay: {
    /** 간편결제 결제 수단에 등록된 카드, 계좌 중 하나로 결제한 금액입니다. */
    amount: number;
    /**간편결제 결제 수단 정보입니다. */
    provider: string;
    /** 간편결제 결제 수단의 적립 포인트나 쿠폰 등을 사용해서 즉시 할인된 금액입니다. */
    discountAmount: number;
  } | null;

  easyPayAmount: number | null;

  /** 결제한 국가 정보입니다. ISO-3166의 두 자리 국가 코드 형식입니다. */
  country: string;

  /** 결제 실패 정보입니다. */
  failure: {
    code: string;
    message: string;
  } | null;

  cashReceipt: {
    /** 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나의 값입니다. */
    type: string;
    /** 현금영수증 처리된 금액입니다. */
    amount: number;
    /** 면세 처리된 금액입니다. */
    taxFreeAmount: number;
    /** 현금영수증 발급번호입니다. */
    issueNumber: string;
    /** 발행된 현금영수증을 확인할 수 있는 주소입니다. */
    receiptUrl: string;
  } | null;

  /** 카드사의 즉시 할인 프로모션 정보입니다. 즉시 할인 프로모션이 적용됐을 때만 생성됩니다. */
  discount: {
    /** 카드사의 즉시 할인 프로모션을 적용한 금액입니다. */
    amount: number;
  } | null;
}

/** 결제할 카드 정보와 orderId로 결제를 요청합니다. */
export interface KeyInPaymentBody {
  /** 결제할 금액입니다. */
  amount: number;
  /**
   * 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다.
   * 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
   * */
  orderId: string;
  /** 카드 번호입니다. */
  cardNumber: string;
  /** 카드 유효 월입니다. */
  cardExpirationYear: string;
  /** 카드 유효 월입니다.*/
  cardEppirationMonth: string;
  /** 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최소 1글자 이상 100글자 이하여야 합니다. */
  orderName: string;
  /** 카드 비밀번호 앞 두자리입니다. */
  cardPassword?: string;
  /** 카드 소유자 정보입니다. 생년월일 6자리(YYMMDD) 혹은 사업자등록번호 10자리가 들어갑니다. */
  customerIdentityNumber: string;
  /**
   * 할부 개월 수입니다. 할부 개월을 직접 설정하기 위해 사용합니다.
   * 값은 2부터 12까지 사용할 수 있습니다. 0이 들어가는 경우 할부가 아닌 일시불로 결제됩니다.
   */
  cardInstallmentPlna: number;
  /**
   *  카드사 무이자 할부 적용 여부입니다. 기본값은 false 입니다.
   *  값이 true이면 카드 정보와 cardInstallmentPlan에 지정한 할부 개월로 무이자 할부가 적용됩니다
   *  이 파라미터를 통해 적용된 무이자 할부 비용은 상점이 부담합니다.
   */
  usePreeInstallmentPlan: boolean;
  /**
   * 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다.
   * 면세 상점 혹은 복합 과세 상점일 때만 설정한 금액이 적용되고, 일반 과세 상점인 경우에는 적용되지 않습니다
   */
  taxFreeAmount: number;
  /**
   * 고객의 이메일 주소입니다. 결제결과를 알려줄 때 사용합니다.
   */
  customerEmail: string;
  /**
   * 해외 카드로 결제하는 경우 3DS 인증 적용을 위해 사용합니다.
   */
  vbv?: {
    cavv: string;
    xid: string;
    eci: string;
  };
}

export interface Card {
  /** 카드로 결제한 금액입니다.*/
  amount: number;
  /** 카드사 코드입니다. */
  company: CardCompanyCode.KR | CardCompanyCode.EN;
  /** 카드번호입니다. 번호의 일부는 마스킹 되어 있습니다. */
  number: string;
  /** 할부 개월 수 입니디. 일시불인 경우 0 입니다. */
  installmentPlanMonths: number;
  /** 카드사 승인 번호입니다. */
  approveNo: string;
  /** 카드사 포인트를 사용했는지 여부입니다. */
  useCardPoint: boolean;
  /** 카드 종류입니다. 신용, 체크, 기프트 중 하나입니다. */
  cardType: string;
  /** 카드의 소유자 타입입니다. 개인, 법인 중 하나입니다. */
  ownerType: string;
  /** 카드 매출 전표를 확인할 수 있는 주소입니다. */
  receiptUrl: string;
  /** 카드 결제의 매입 상태입니다. 아래와 같은 상태값을 가질 수 있습니다. */
  acquireStatus: string;
  /** 무이자 할부의 적용 여부입니다. */
  isInterestFree: boolean;
  /**
   * 무이자 할부가 적용된 결제일 때 할부 수수료를 부담하는 주체에 대한 정보입니다.
   * BUYER, CARD_COMPANY, MERCHANT 중 하나입니다.
   */
  interestPayer: 'BUYER' | 'CARD_COMPANY' | 'MERCHANT';
}

/** 가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다. */
export interface VirtualAccount {
  /** 가상계좌 타입을 나타냅니다. 일반, 고정 중 하나입니다. */
  accountType: '일반' | '고정';
  /** 발급된 계좌번호입니다. */
  accountNumber: string;
  /** 가상계좌를 발급한 은행입니다. */
  bank: BankCode.KR | BankCode.EN;
  /** 가상계좌를 발급한 고객 이름입니다. */
  customerName: string;
  /** 입금 기한 입니다. */
  dueDate: string;
  /** 환불처리 상태입니다. */
  refundStatus: REFUND_STATUS;
  /** 가상계좌가 만료되었는지 여부입니다. */
  expired: boolean;
  /** 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다. */
  settlementStatus: 'INCOMPLETE' | 'COMPLETE';
}

/** 결제 취소 객체 */
export interface Cancel {
  /**
   * 결제를 취소한 금액입니다.
   */
  cancelAmount: number;
  /**
   * 결제를 취소한 이유입니다.
   */
  cancelReason: string;
  /**
   * 취소된 금액 중 면세 금액입니다.
   */
  taxFreeAmount: number;
  /**
   * 과세 처리된 금액입니다.
   */
  taxAmount?: number;

  /**
   * 결제 취소 후 환불 가능한 잔액입니다.
   */
  refundableAmount: number;

  /**
   * 결제 취소가 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm입니다.
   */
  canceledAt: string;

  /**
   * 취소 건에 대한 고유한 키 값입니다. 여러 건의 취소 거래를 구분하는데 사용됩니다.
   */
  transactionKey: string;
}
