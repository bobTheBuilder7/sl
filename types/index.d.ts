/** @typedef {'hy' | 'ru' | 'en'} Locale */
export type Locale = 'hy' | 'ru' | 'en';
export type DoctorResponse = {
	doctor: {
		id: number;
		name: string;
		position: string;
	};
	contents: {
		body: string;
		lvl: number;
	}[];
};
/**
 * @typedef {{
 * 	doctor: { id: number; name: string; position: string };
 * 	contents: { body: string; lvl: number }[];
 * }} DoctorResponse
 */
/** Client for sending page visits and events to the SL analytics API. */
export declare class SLClient {
	#private;
	/** @param {string} baseUrl Base URL of the SL analytics server. */
	constructor(baseUrl: string);
	/**
	 * @param {{ visitor_id: string; referer: string; href: string; ip: string }} payload
	 * @returns {Promise<void>}
	 */
	pageVisit(payload: { visitor_id: string; referer: string; href: string; ip: string }): Promise<void>;
	/**
	 * @param {{ visitor_id: string; event: string; href: string; ip: string; extra?: string }} payload
	 * @returns {Promise<void>}
	 */
	pageEvent(payload: { visitor_id: string; event: string; href: string; ip: string; extra?: string }): Promise<void>;
	/**
	 * @param {{ id: number; locale: Locale }} params
	 * @returns {Promise<DoctorResponse>}
	 */
	getDoctor({ id, locale }: { id: number; locale: Locale }): Promise<DoctorResponse>;
}
