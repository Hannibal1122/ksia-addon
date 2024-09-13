import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef } from "@angular/core";
import { DynamicComponents } from "./dynamic-components";

@Component({
    selector: "app-ksia-addon",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    standalone: true,
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
    title = "ksia-addon-angular";

    constructor(
        private dynamicComponents: DynamicComponents,
        private elementRef: ElementRef,
    ) {
        this.dynamicComponents.define("test-web-component");

        this.elementRef.nativeElement.addEventListener("ready", (e: any) => {
            console.log(e);
        });
    }

    ngOnInit() {
        const event = new CustomEvent("ready", {
            detail: { dynamicComponents: this.dynamicComponents, fuck: "test" },
        });
        this.elementRef.nativeElement.dispatchEvent(event);
    }
}
