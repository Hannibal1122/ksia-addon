import { Component, Input } from "@angular/core";

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
