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
export type AllPlan = {
	id: number;
	state: string;
	employee_name: string;
	price: number;
	old_price: number;
};
export type Plan = {
	id: number;
	state: string;
	employee_name: string;
	price_after_discounts: number;
	price_before_discounts: number;
	old_price: number;
};
export type Treatment = {
	id: number;
	name: string;
	price: number;
	discount: number;
	what_treating: string;
	step: number;
	when_paid: number;
	when_completed: number;
	old_price: number;
	full_name: string | null;
	special: string | null;
};
export type PlanResponse = {
	plan: Plan;
	treatments: Treatment[];
	missing_teeth: string[];
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
export type CreateWebsiteAppointmentResponse = {
	message: string;
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
/**
 * @typedef {{
 * 	id: number;
 * 	state: string;
 * 	employee_name: string;
 * 	price: number;
 * 	old_price: number;
 * }} AllPlan
 */
/**
 * @typedef {{
 * 	id: number;
 * 	state: string;
 * 	employee_name: string;
 * 	price_after_discounts: number;
 * 	price_before_discounts: number;
 * 	old_price: number;
 * }} Plan
 */
/**
 * @typedef {{
 * 	id: number;
 * 	name: string;
 * 	price: number;
 * 	discount: number;
 * 	what_treating: string;
 * 	step: number;
 * 	when_paid: number;
 * 	when_completed: number;
 * 	old_price: number;
 * 	full_name: string | null;
 * 	special: string | null;
 * }} Treatment
 */
/** @typedef {{ plan: Plan; treatments: Treatment[]; missing_teeth: string[] }} PlanResponse */
/** @typedef {{ doctors: Doctor[] }} DoctorsResponse */
/** @typedef {{ services: Service[]; categories: Category[] }} PricesResponse */
/** @typedef {{ title: string; description: string; keywords: string }} SeoResponse */
/** @typedef {{ price: number; old_price: number }} DealResponse */
/** @typedef {{ message: string }} CreateWebsiteAppointmentResponse */
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
	/**
	 * @param {{ name: string; phone: string; email: string; website: string }} payload
	 * @returns {Promise<CreateWebsiteAppointmentResponse>}
	 */
	createWebsiteAppointment(payload: {
		name: string;
		phone: string;
		email: string;
		website: string;
	}): Promise<CreateWebsiteAppointmentResponse>;
	/**
	 * @param {{ certificate_id: number; firstname: string; lastname: string }} payload
	 * @returns {Promise<void>}
	 */
	updateCertificateName(payload: { certificate_id: number; firstname: string; lastname: string }): Promise<void>;
	/**
	 * @param {{ patient_id: number }} params
	 * @returns {Promise<AllPlan[]>}
	 */
	getPlans({ patient_id }: { patient_id: number }): Promise<AllPlan[]>;
	/**
	 * @param {{ patient_id: number; plan_id: number }} params
	 * @returns {Promise<PlanResponse>}
	 */
	getPlan({ patient_id, plan_id }: { patient_id: number; plan_id: number }): Promise<PlanResponse>;
}
