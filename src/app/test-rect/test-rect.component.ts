import { Component, Input } from "@angular/core";

@Component({
    selector: "test-rect",
    standalone: true,
    imports: [],
    templateUrl: "./test-rect.component.html",
    styleUrl: "./test-rect.component.css",
})
export class TestRectComponent {
    @Input() inputs: {
        color: string;
    } = {
        color: "green",
    };

    ngOnDestroy() {
        console.log("test-rect destroyed");
    }
}
