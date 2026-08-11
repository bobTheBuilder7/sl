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

export class SLClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl.replace(/\/+$/, "");
	}

	private async post(path: string, payload: PageVisit | PageEvent) {
		const response = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			throw new Error(`SL analytics request failed with status ${response.status}`);
		}
	}

	async pageVisit(payload: PageVisit) {
		await this.post("/api/slytics/visit", payload);
	}

	async pageEvent(payload: PageEvent) {
		await this.post("/api/slytics/event", payload);
	}
}
