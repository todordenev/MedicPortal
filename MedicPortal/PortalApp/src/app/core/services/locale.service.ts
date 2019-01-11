import { Injectable } from '@angular/core';
import { LocaleSettings } from 'primeng/calendar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  en: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'mm/dd/yy'
  };

  bg: LocaleSettings = {
    firstDayOfWeek: 1,
    dayNames: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
    dayNamesShort: ['Нед', 'Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб'],
    dayNamesMin: ['Не', 'По', 'Вт', 'Ср', 'Че', 'Пе', 'Съ'],
    monthNames: [
      'Януари',
      'Февруари',
      'Март',
      'Април',
      'Май',
      'Юни',
      'Юли',
      'Аугуст',
      'Септември',
      'Октомври',
      'Ноември',
      'Декември'
    ],
    monthNamesShort: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Ауг', 'Сеп', 'Окт', 'Нов', 'Дец'],
    today: 'Днес',
    clear: 'Изчисти',
    dateFormat: 'dd.mm.yy'
  };

  get current(): Observable<LocaleSettings> {
    return this._current.asObservable();
  }
  _current = new BehaviorSubject<LocaleSettings>(this.bg);
  constructor() {
  }
}
