import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TestRectComponent } from "./test-rect.component";

describe("TestRectComponent", () => {
    let component: TestRectComponent;
    let fixture: ComponentFixture<TestRectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestRectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestRectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
