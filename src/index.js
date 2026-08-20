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
	 * @returns {Promise<void>}
	 */
	async post(path, payload) {
		try {
			const response = await fetch(`${this.#baseUrl}${path}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch {}
	}

	/**
	 * @param {string} path
	 * @returns {Promise<void>}
	 */
	async get(path, payload) {
		try {
			const response = await fetch(`${this.#baseUrl}${path}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch {}
	}

	/**
	 * @param {{ visitor_id: string; referer: string; href: string; ip: string }} payload
	 * @returns {Promise<void>}
	 */
	async pageVisit(payload) {
		await this.post('POST', '/api/slytics/visit', payload);
	}

	/**
	 * @param {{ visitor_id: string; event: string; href: string; ip: string; extra?: string }} payload
	 * @returns {Promise<void>}
	 */
	async pageEvent(payload) {
		await this.post('POST', '/api/slytics/event', payload);
	}
}
