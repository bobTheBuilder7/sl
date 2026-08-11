//#region src/index.d.ts
interface PageVisit {
  visitor_id: string;
  referer: string;
  href: string;
  ip: string;
}
interface PageEvent {
  visitor_id: string;
  event: string;
  href: string;
  ip: string;
  extra?: string;
}
declare class SLClient {
  private baseUrl;
  constructor(baseUrl: string);
  private post;
  pageVisit(payload: PageVisit): Promise<void>;
  pageEvent(payload: PageEvent): Promise<void>;
}
//#endregion
export { SLClient };