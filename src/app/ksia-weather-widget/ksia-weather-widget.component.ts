import { Component, Input } from "@angular/core";
import { ExternalPrimitiveAttributes, WidgetElementProperty } from "@ksia-widgets";

@ExternalPrimitiveAttributes(
    [
        new WidgetElementProperty("city", 0, "text"),
        new WidgetElementProperty("t", 0, "number"),
        new WidgetElementProperty("minT", 0, "number"),
        new WidgetElementProperty("maxT", 0, "number"),
        new WidgetElementProperty("feelT", 0, "number"),
    ],
    "ksia-weather-widget",
)
@Component({
    selector: "ksia-weather-widget",
    templateUrl: "./ksia-weather-widget.component.html",
    styleUrl: "./ksia-weather-widget.component.css",
    standalone: true,
    imports: [],
})
export class KsiaWeatherWidgetComponent {
    @Input()
    inputs: {
        city: string;
        t: number;
        minT: number;
        maxT: number;
        feelT: number;
    } = {
        city: "",
        t: 0,
        minT: 0,
        maxT: 0,
        feelT: 0,
    };
}
