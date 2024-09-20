import { Injectable, Injector, Type } from "@angular/core";
import { KsiaWebComponentLoader } from "@ksia-widgets";

@Injectable()
export class DynamicComponents extends KsiaWebComponentLoader {
    constructor(protected override injector: Injector) {
        super();
    }

    override async getComponent(selector: string): Promise<Type<any> | null> {
        switch (selector) {
            case "test-web-component":
                return import("./test-web-component/test-web-component.component").then(
                    (m) => m.TestWebComponentComponent,
                );
            case "test-rect":
                return import("./test-rect/test-rect.component").then((m) => m.TestRectComponent);
            case "ksia-weather-widget":
                return import("./ksia-weather-widget/ksia-weather-widget.component").then(
                    (m) => m.KsiaWeatherWidgetComponent,
                );
        }

        return null;
    }
}
