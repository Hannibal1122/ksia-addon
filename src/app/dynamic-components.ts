import { Injectable, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";

@Injectable({ providedIn: "root" })
export class DynamicComponents {
    constructor(private injector: Injector) {}

    async define(selector: string) {
        const component = await this.getComponent(selector);
        if (!component) return;

        const element = createCustomElement(component, { injector: this.injector });
        customElements.define(selector, element);
    }

    async getComponent(selector: string) {
        switch (selector) {
            case "test-web-component":
                return import("./test-web-component/test-web-component.component").then(
                    (m) => m.TestWebComponentComponent,
                );
        }

        return null;
    }
}
