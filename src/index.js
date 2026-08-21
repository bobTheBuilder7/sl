/** @typedef {'hy' | 'ru' | 'en'} Locale */

/**
 * @typedef {{
 * 	doctor: { id: number; name: string; position: string };
 * 	contents: { body: string; lvl: number }[];
 * }} DoctorResponse
 */

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
	 * @returns {Promise<void>}
	 */
	async #get(path, payload) {
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
}
