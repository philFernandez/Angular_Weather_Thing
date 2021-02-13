import { ComponentFixture, inject, TestBed, waitForAsync } from "@angular/core/testing";
import { CurrentWeatherComponent } from "./current-weather.component";
import { WeatherService } from "../weather/weather.service";
import { WeatherServiceFake } from "../weather/weather.service.fake";
import { injectSpy } from "angular-unit-test-helper";
import { of } from "rxjs";

describe("CurrentWeatherComponent", () => {
    let component: CurrentWeatherComponent;
    let fixture: ComponentFixture<CurrentWeatherComponent>;
    let weatherServiceMock: jasmine.SpyObj<WeatherService>;
    beforeEach(async () => {
        const weatherServiceSpy = jasmine.createSpyObj("WeatherService", [
            "getCurrentWeather",
        ]);
        TestBed.configureTestingModule({
            declarations: [CurrentWeatherComponent],
            providers: [
                {
                    provide: WeatherService,
                    useValue: weatherServiceSpy,
                },
            ],
        }).compileComponents();
        weatherServiceMock = injectSpy(WeatherService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentWeatherComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        weatherServiceMock.getCurrentWeather.and.returnValue(of());
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
