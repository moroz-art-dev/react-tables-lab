import {ColDef} from '@ag-grid-community/core';
import {RowData} from './types';

// Default column settings
export const defaultColDef: ColDef<RowData> = {
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
};

// Locale text for Ukrainian translation
export const localeText = {
  page: 'Сторінка',
  more: 'Ще',
  to: 'до',
  of: 'з',
  next: 'Далі',
  last: 'Остання',
  first: 'Перша',
  previous: 'Попередня',
  loadingOoo: 'Завантаження...',

  equals: 'Дорівнює',
  notEqual: 'Не дорівнює',
  lessThan: 'Менше ніж',
  greaterThan: 'Більше ніж',
  lessThanOrEqual: 'Менше або дорівнює',
  greaterThanOrEqual: 'Більше або дорівнює',
  inRange: 'У діапазоні',
  contains: 'Містить',
  notContains: 'Не містить',
  startsWith: 'Починається з',
  endsWith: 'Закінчується на',

  filterOoo: 'Фільтр...',
  applyFilter: 'Застосувати',
  clearFilter: 'Очистити',
  filterConditions: 'Умови фільтрації',
};
