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
		this.baseUrl = baseUrl;
	}

	async pageVisit(b: PageVisit) {
		try {
			await fetch(`${this.baseUrl}/api/slytics/visit`, {
				method: "POST",
				body: JSON.stringify(b),
			});
		} catch {}
	}

	async pageEvent(b: PageEvent) {
		try {
			await fetch(`${this.baseUrl}/api/slytics/event`, {
				method: "POST",
				body: JSON.stringify(b),
			});
		} catch {}
	}
}
