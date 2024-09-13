import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TestWebComponentComponent } from "./test-web-component.component";

describe("TestWebComponentComponent", () => {
    let component: TestWebComponentComponent;
    let fixture: ComponentFixture<TestWebComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestWebComponentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestWebComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
