export interface TossPaymentsConfig {
  /**
   * 시크릿 키는 토스페이먼츠 API를 호출할 때 사용되는 키입니다. 노출되면 안됩니다.
   */
  secretKey: string;
}

export enum ACQUIRE_STATUS {
  /** 매입 대기 */
  READY = "READY",

  /** 매입 요청됨 */
  REQUESTED = "REQUESTED",

  /** 매입 완료 */
  COMPLETED = "COMPLETED",

  /** 매입 취소 요청됨 */
  CANCEL_REQUESTED = "CANCEL_REQUESTED",

  /** 매입 취소 완료 */
  CANCELED = "CANCELED",
}

export namespace PayMethod {
  export enum KR {
    카드 = "카드",
    가상계좌 = "가상계좌",
    휴대폰 = "휴대폰",
    계좌이체 = "계좌이체",
    문화상품권 = "문화상품권",
    도서문화상품권 = "도서문화상품권",
    게임문화상품권 = "게임문화상품권",
  }

  export enum EN {
    CARD = "CARD",
    VIRTUAL_ACCOUNT = "VIRTUAL_ACCOUNT",
    MOBILE_PHONE = "MOBILE_PHONE",
    TRANSFER = "TRANSFER",
    CULTURE_GIFT_CERTIFICATE = "CULTURE_GIFT_CERTIFICATE",
    BOOK_GIFT_CERTIFICATE = "BOOK_GIFT_CERTIFICATE",
    GAME_GIFT_CERTIFICATE = "GAME_GIFT_CERTIFICATE",
  }
}

export namespace EasyPay {
  export enum KR {
    토스페이 = "토스페이",
    삼성페이 = "삼성페이",
    엘페이 = "엘페이",
    카카오페이 = "카카오페이",
    페이코 = "페이코",
    LG페이 = "LG페이",
    SSG페이 = "SSG페이",
  }

  export enum EN {
    TOSSPAY = "TOSSPAY",
    SAMSUNGPAY = "SAMSUNGPAY",
    LPAY = "LPAY",
    KAKAOPAY = "KAKAOPAY",
    PAYCO = "PAYCO",
    LGPAY = "LGPAY",
    SSG = "SSG",
  }
}

export enum 해외_카드사_코드 {
  다이너스 = "다이너스",
  디스커버 = "디스커버",
  마스터 = "마스터",
  비자 = "비자",
  유니온페이 = "유니온페이",
  JDC = "JDC",
}

export namespace CardCompanyCode {
  export enum KR {
    광주 = "광주",
    국민 = "국민",
    농협 = "농협",
    롯데 = "롯데",
    산업 = "산업",
    삼성 = "삼성",
    새마을 = "새마을",
    수협 = "수협",
    신한 = "신한",
    신협 = "신협",
    씨티 = "씨티",
    우리 = "우리",
    우체국 = "우체국",
    저축 = "저축",
    전북 = "전북",
    제주 = "제주",
    카카오뱅크 = "카카오뱅크",
    하나 = "하나",
    현대 = "현대",
    비씨 = "BC",
  }

  export enum EN {
    GWANGJUBANK = "GWANGJUBANK",
    KOOKMIN = "KOOKMIN",
    NONGHYEOP = "NONGHYEOP",
    LOTTE = "LOTTE",
    KDBBANK = "KDBBANK",
    SAMSUNG = "SAMSUNG",
    SAEMAUL = "SAEMAUL",
    SUHYEOP = "SUHYEOP",
    SHINHAN = "SHINHAN",
    SHINHYEOP = "SHINHYEOP",
    CITI = "CITI",
    WOORI = "WOORI",
    POST = "POST",
    SAVINGBANK = "SAVINGBANK",
    JEONBUKBANK = "JEONBUKBANK",
    JEJUBANK = "JEJUBANK",
    KAKAOBANK = "KAKAOBANK",
    HANA = "HANA",
    현대HYUNDAI카드 = "HYUNDAI",
    BC = "BC",
  }
}

export namespace BankCode {
  export enum KR {
    경남은행 = "경남",
    광주은행 = "광주",
    KB국민은행 = "국민",
    IBK기업은행 = "기업",
    NH농협은행 = "농협",
    단위농협 = "단위농협",
    DGB대구은행 = "대구",
    부산은행 = "부산",
    KDB산업은행 = "산업",
    새마을금고 = "새마을",
    산림조합 = "산림",
    Sh수협은행 = "수협",
    신한은행 = "신한",
    신협 = "신협",
    씨티은행 = "씨티",
    우리은행 = "우리",
    우체국예금보험 = "우체국",
    저축은행중앙회 = "저축",
    전북은행 = "전북",
    제주은행 = "제주",
    카카오뱅크 = "카카오",
    케이뱅크 = "케이",
    토스뱅크 = "토스",
    하나은행 = "하나",
    SC제일은행 = "SC제일",
    홍콩상하이은행 = "HSBC",
  }

  export enum EN {
    KYONGNAMBANK = "KYONGNAMBANK",
    GWANGJUBANK = "GWANGJUBANK",
    KOOKMIN = "KOOKMIN",
    IBK = "IBK",
    NONGHYEOP = "NONGHYEOP",
    LOCALNONGHYEOP = "LOCALNONGHYEOP",
    DAEGUBANK = "DAEGUBANK",
    BUSANBANK = "BUSANBANK",
    KDBBANK = "KDBBANK",
    SAEMAUL = "SAEMAUL",
    SANLIM = "SANLIM",
    SUHYEOP = "SUHYEOP",
    SHINHAN = "SHINHAN",
    SHINHYEOP = "SHINHYEOP",
    CITI = "CITI",
    WOORI = "WOORI",
    POST = "POST",
    SAVINGBANK = "SAVINGBANK",
    JEONBUKBANK = "JEONBUKBANK",
    JEJUBANK = "JEJUBANK",
    KAKAOBANK = "KAKAOBANK",
    KBANK = "KBANK",
    TOSSBANK = "TOSSBANK",
    HANA = "HANA",
    SC = "SC",
    HSBC = "HSBC",
  }
}

export enum ACCOUNT_TYPE {
  NORMAL = "NORMAL",
  FIXED = "FIXED",
}

export namespace CartType {
  export enum KR {
    신용 = "신용",
    체크 = "체크",
    기프트 = "기프트",
  }

  export enum EN {
    CREDIT = "CREDIT",
    CHECK = "CHECK",
    GIFT = "GIFT",
  }
}

export enum CART_TYPE {
  CREDIT = "CREDIT",
  CHECK = "CHECK",
  GIFT = "GIFT",
}

export namespace OwnerType {
  export enum KR {
    개인 = "개인",
    법인 = "법인",
    미확인 = "미확인",
  }

  export enum EN {
    PERSONAL = "PERSONAL",
    CORPORATE = "CORPORATE",
    UNKNOWN = "UNKNOWN",
  }
}

export namespace PaymentType {
  export enum KR {
    "일반 결제" = "일반 결제",
    "자동 결제" = "자동 결제",
    "브랜드페이" = "브랜드페이",
  }

  export enum EN {
    NORMAL = "NORMAL",
    BILLING = "BILLING",
    BRANDPAY = "BRANDPAY",
  }
}

export enum REFUND_STATUS {
  /** 해당없음 */
  NONE = "NONE",
  /** 환불실패 */
  FAILED = "FAILED",
  /** 환불 처리중 */
  PENDING = "PENDING",
  /** 부분 환불 실패 */
  PARTIAL_FAILED = "PARTIAL_FAILED",
  /** 환불 여부 */
  COMPLETED = "COMPLETED",
}

/**
 * 결제 처리 상태입니다. 아래와 같은 상태값을 가질 수 있습니다.
 */
export enum PAYMENT_STATUS {
  /** 준비됨 */
  READY = "READY",
  /** 진행중 */
  IN_PROGRESS = "IN_PROGRESS",
  /** 가상계좌 입금 대기 중 */
  WAITING_FOR_DEPOSIT = "WAITING_FOR_DEPOSIT",
  /** 결제 완료됨 */
  DONE = "DONE",
  /** 결제가 취소됨  */
  CANCELED = "CANCELED",
  /** 결제가 부분 취소됨 */
  PARTIAL_CANCELED = "PARTIAL_CANCELED",
  /** 카드 자동 결제 혹은 키인 결제를 할 때 결제 승인에 실패함  */
  ABORTED = "ABORTED",
  /** 유효 시간(30분)이 지나 거래가 취소됨 */
  EXPIRED = "EXPIRED",
}

export enum MOBILE_OPERATOR {
  KT = "KT",
  LGU = "LGU",
  SKT = "SKT",
  HELLO = "HELLO",
  KCT = "KCT",
  SK7 = "SK7",
}
