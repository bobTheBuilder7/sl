/** @typedef {'hy' | 'ru' | 'en'} Locale */

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
export class SLClient {
	#baseUrl;

	/** @param {string} baseUrl Base URL of the SL analytics server. */
	constructor(baseUrl) {
		this.#baseUrl = baseUrl;
	}

	/**
	 * @param {string} path
	 * @param {Record<string, unknown>} payload
	 * @returns {Promise<unknown>}
	 */
	async #post(path, payload) {
		const req = await fetch(`${this.#baseUrl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!req.ok) {
			throw new Error(await req.text());
		}

		const resp = await req.json();

		return resp;
	}

	/**
	 * @param {string} path
	 * @returns {Promise<unknown>}
	 */
	async #get(path) {
		const req = await fetch(`${this.#baseUrl}${path}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!req.ok) {
			throw new Error(await req.text());
		}

		const resp = await req.json();

		return resp;
	}

	/**
	 * @param {{ visitor_id: string; referer: string; href: string; ip: string }} payload
	 * @returns {Promise<void>}
	 */
	async pageVisit(payload) {
		try {
			await this.#post('/api/slytics/visit', payload);
		} catch {}
	}

	/**
	 * @param {{ visitor_id: string; event: string; href: string; ip: string; extra?: string }} payload
	 * @returns {Promise<void>}
	 */
	async pageEvent(payload) {
		try {
			await this.#post('/api/slytics/event', payload);
		} catch {}
	}

	/**
	 * @param {{ id: number; locale: Locale }} params
	 * @returns {Promise<DoctorResponse>}
	 */
	async getDoctor({ id, locale }) {
		const doctor = await this.#post(`/api/cms/doctors/${id}`, { locale });

		return doctor;
	}

	/** @returns {Promise<PricesResponse>} */
	async getPrices() {
		const prices = await this.#get('/api/cms/prices');

		return prices;
	}

	/** @returns {Promise<Doctor[]>} */
	async getMainDoctors() {
		const doctors = await this.#get('/api/cms/doctors/main');

		return doctors;
	}

	/**
	 * @param {{ locale: Locale }} params
	 * @returns {Promise<DoctorsResponse>}
	 */
	async getDoctors({ locale }) {
		const doctors = await this.#post('/api/cms/doctors', { locale });

		return doctors;
	}

	/**
	 * @param {{ pathname: string }} params
	 * @returns {Promise<SeoResponse>}
	 */
	async getSeo({ pathname }) {
		const seo = await this.#post('/api/cms/seo', { pathname });

		return seo;
	}

	/**
	 * @param {{ name: string }} params
	 * @returns {Promise<DealResponse>}
	 */
	async getDeal({ name }) {
		const deal = await this.#post('/api/cms/deals', { name });

		return deal;
	}
}
