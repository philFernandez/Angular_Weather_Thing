import { ComponentFixture, inject, TestBed, waitForAsync } from "@angular/core/testing";
import { CurrentWeatherComponent } from "./current-weather.component";
import { WeatherService } from "../weather/weather.service";
import { fakeWeather, WeatherServiceFake } from "../weather/weather.service.fake";
import { injectSpy } from "angular-unit-test-helper";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

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

    it("should get currentWeather from weatherService", () => {
        weatherServiceMock.getCurrentWeather.and.returnValue(of());
        fixture.detectChanges();
        expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
    });

    it("should eagerly load currentWeather in Sacramento from weatherService", () => {
        // arrange
        weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
        // act
        fixture.detectChanges();
        // assert
        expect(component.current).toBeDefined();
        expect(component.current.city).toEqual("Sacramento");
        expect(component.current.temperature).toEqual(280.32);
        // assert dom
        const debugE1 = fixture.debugElement;
        const titleE1: HTMLElement = debugE1.query(By.css("span")).nativeElement;
        expect(titleE1.textContent).toContain("Sacramento");
    });
});
