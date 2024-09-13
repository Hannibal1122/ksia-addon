import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { KSIA_DYNAMIC_WIDGETS, KsiaDynamicWidgetsComponent } from "@ksia-widgets";
import { DynamicComponents } from "./dynamic-components";

@Component({
    selector: "ksia-addon-angular",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    standalone: true,
    imports: [KsiaDynamicWidgetsComponent],
    providers: [{ provide: KSIA_DYNAMIC_WIDGETS, useClass: DynamicComponents }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
