//#region src/index.ts
var SLClient = class {
	baseUrl;
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}
	async pageVisit(b) {
		try {
			await fetch(`${this.baseUrl}/api/slytics/visit`, {
				method: "POST",
				body: JSON.stringify(b)
			});
		} catch {}
	}
	async pageEvent(b) {
		try {
			await fetch(`${this.baseUrl}/api/slytics/event`, {
				method: "POST",
				body: JSON.stringify(b)
			});
		} catch {}
	}
};
//#endregion
export { SLClient };
