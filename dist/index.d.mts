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
  pageVisit(b: PageVisit): Promise<void>;
  pageEvent(b: PageEvent): Promise<void>;
}
//#endregion
export { SLClient };