import { Component, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { ExternalPrimitiveAttributes } from "ksia-widgets";
import * as maplibregl from "maplibre-gl";

@ExternalPrimitiveAttributes([], "ksia-map")
@Component({
    selector: "ksia-map",
    templateUrl: "./ksia-map.component.html",
    styleUrls: ["./ksia-map.component.css"],
    standalone: true,
})
export class KsiaMapComponent implements AfterViewInit {
    @ViewChild("mapElement") mapElement!: ElementRef<HTMLDivElement>;

    ngAfterViewInit(): void {
        const map = new maplibregl.Map({
            container: this.mapElement.nativeElement,
            style: "https://demotiles.maplibre.org/style.json",
            center: [37.6173, 55.7558], // Москва, как пример
            zoom: 17,
        });

        map.on("load", () => {
            const buildingsGeoJson = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: { name: "Основное здание" },
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [37.6175, 55.7557],
                                    [37.6177, 55.7557],
                                    [37.6177, 55.7555],
                                    [37.6175, 55.7555],
                                    [37.6175, 55.7557],
                                ],
                            ],
                        },
                    },
                    {
                        type: "Feature",
                        properties: { name: "Кательная" },
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [37.617, 55.7554],
                                    [37.6172, 55.7554],
                                    [37.6172, 55.7552],
                                    [37.617, 55.7552],
                                    [37.617, 55.7554],
                                ],
                            ],
                        },
                    },
                    {
                        type: "Feature",
                        properties: { name: "ЗРУ" },
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [37.6174, 55.7551],
                                    [37.6176, 55.7551],
                                    [37.6176, 55.7549],
                                    [37.6174, 55.7549],
                                    [37.6174, 55.7551],
                                ],
                            ],
                        },
                    },
                ],
            };

            map.addSource("buildings", {
                type: "geojson",
                data: buildingsGeoJson as any,
            });

            // Заливка зданий
            map.addLayer({
                id: "building-fill",
                type: "fill",
                source: "buildings",
                paint: {
                    "fill-color": "#0080ff",
                    "fill-opacity": 0.5,
                },
            });

            // Контур зданий
            map.addLayer({
                id: "building-outline",
                type: "line",
                source: "buildings",
                paint: {
                    "line-color": "#000",
                    "line-width": 2,
                },
            });

            // Обработка клика по зданию
            map.on("click", "building-fill", (e) => {
                const feature = e.features?.[0];
                if (feature) {
                    const coordinates = e.lngLat as maplibregl.LngLatLike;
                    const name = feature.properties["name"];

                    new maplibregl.Popup().setLngLat(coordinates).setText(name).addTo(map);
                }
            });

            // Изменение курсора при наведении
            map.on("mouseenter", "building-fill", () => {
                map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "building-fill", () => {
                map.getCanvas().style.cursor = "";
            });
        });
    }
}
