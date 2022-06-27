import { AxiosInstance } from 'axios';
import { Resource } from '../resource';
import { Settlement } from './type';

/**
 * 정산 조회 API로 원하는 기간 동안의 정산 기록을 조회하고 대조 확인하는 작업을 할 수 있습니다.
 * {@link https://docs.tosspayments.com/reference#%EC%A0%95%EC%82%B0}
 */
export class SettlementResource implements Resource {
  readonly path = 'settlements';
  constructor(private httpClient: AxiosInstance) {}

  /**
   * 지정한 날짜 정보로 정산 기록을 조회합니다.
   * @param range 조회를 시작하고 마치고 싶은 날짜 정보입니다. ISO 8601 형식인 yyyy-MM-dd를 사용합니다.
   * @param page 조회할 페이지 값입니다. 최소값은 1입니다.
   * @param size 한 페이지에서 응답으로 보여줄 정산 기록 개수를 의미합니다. 기본값은 100이고 설정할 수 있는 최대값은 10000입니다.
   * @returns 정산 조회 요청에 성공했다면 Settlement 객체가 돌아옵니다.
   */
  async retrieve(range: [string, string], page: number, size?: number) {
    const [startDate, endDate] = range;
    const queryParams = { startDate, endDate, page, size };
    const { data: settlement } = await this.httpClient.get<Settlement>(this.path, { params: queryParams });
    return settlement;
  }

  /**
   * 정산하고 싶은 결제 건을 paymentKey로 특정해서 카드사에 정산을 요청합니다.
   * @param paymentKey 수동 정산을 요청할 결제 건을 특정하는 키 값 입니다.
   * @returns 수동 정산 요청에 성공했다면 result 값이 true로 돌아옵니다.
   */
  async request(paymentKey: string) {
    const { data } = await this.httpClient.post<{ result: true }>(this.path, { paymentKey });
    return data;
  }
}
