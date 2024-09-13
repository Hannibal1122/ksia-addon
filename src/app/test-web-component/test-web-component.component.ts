import { Component, signal } from "@angular/core";

@Component({
    selector: "test-web-component",
    templateUrl: "./test-web-component.component.html",
    styleUrl: "./test-web-component.component.css",
    standalone: true,
    imports: [],
})
export class TestWebComponentComponent {
    count = signal(0);

    ngOnInit() {
        setInterval(() => {
            this.count.update((count) => count + 1);
        }, 1000);
    }
}
