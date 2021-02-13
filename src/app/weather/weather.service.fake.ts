import { Observable, of } from 'rxjs';
import { ICurrentWeather } from '../interfaces';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
    city: 'Sacramento',
    country: 'US',
    date: 1485789600,
    image: '',
    temperature: 280.32,
    description: 'Hellfire like storms',
};

export class WeatherServiceFake implements IWeatherService {
    getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
        return of(fakeWeather);
    }
}
