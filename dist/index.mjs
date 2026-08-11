//#region src/index.ts
var SLClient = class {
	baseUrl;
	constructor(baseUrl) {
		this.baseUrl = baseUrl.replace(/\/+$/, "");
	}
	async post(path, payload) {
		const response = await fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(5e3)
		});
		if (!response.ok) throw new Error(`SL analytics request failed with status ${response.status}`);
	}
	async pageVisit(payload) {
		await this.post("/api/slytics/visit", payload);
	}
	async pageEvent(payload) {
		await this.post("/api/slytics/event", payload);
	}
};
//#endregion
export { SLClient };
