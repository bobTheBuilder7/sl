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
export type Service = {
	id: number;
	name: string;
	price: number;
	old_price: number;
	website_order: number;
	href: string;
	category_id: number;
};
export type Category = {
	id: number;
	name: string;
};
export type Doctor = {
	id: number;
	name: string;
	position: string;
};
export type DoctorsResponse = {
	doctors: Doctor[];
};
export type PricesResponse = {
	services: Service[];
	categories: Category[];
};
export type SeoResponse = {
	title: string;
	description: string;
	keywords: string;
};
export type DealResponse = {
	price: number;
	old_price: number;
};
/**
 * @typedef {{
 * 	doctor: { id: number; name: string; position: string };
 * 	contents: { body: string; lvl: number }[];
 * }} DoctorResponse
 */
/**
 * @typedef {{
 * 	id: number;
 * 	name: string;
 * 	price: number;
 * 	old_price: number;
 * 	website_order: number;
 * 	href: string;
 * 	category_id: number;
 * }} Service
 */
/** @typedef {{ id: number; name: string }} Category */
/** @typedef {{ id: number; name: string; position: string }} Doctor */
/** @typedef {{ doctors: Doctor[] }} DoctorsResponse */
/** @typedef {{ services: Service[]; categories: Category[] }} PricesResponse */
/** @typedef {{ title: string; description: string; keywords: string }} SeoResponse */
/** @typedef {{ price: number; old_price: number }} DealResponse */
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
	/** @returns {Promise<PricesResponse>} */
	getPrices(): Promise<PricesResponse>;
	/** @returns {Promise<Doctor[]>} */
	getMainDoctors(): Promise<Doctor[]>;
	/**
	 * @param {{ locale: Locale }} params
	 * @returns {Promise<DoctorsResponse>}
	 */
	getDoctors({ locale }: { locale: Locale }): Promise<DoctorsResponse>;
	/**
	 * @param {{ pathname: string }} params
	 * @returns {Promise<SeoResponse>}
	 */
	getSeo({ pathname }: { pathname: string }): Promise<SeoResponse>;
	/**
	 * @param {{ name: string }} params
	 * @returns {Promise<DealResponse>}
	 */
	getDeal({ name }: { name: string }): Promise<DealResponse>;
}
