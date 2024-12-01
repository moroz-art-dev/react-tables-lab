import {ColDef} from '@ag-grid-community/core';
import {RowData} from './types';

// Column definitions
export const colDefs: ColDef<RowData>[] = [
  {
    field: 'make',
    headerName: 'Make',
    editable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'model',
    headerName: 'Model',
    editable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    field: 'price',
    headerName: 'Price',
    editable: true,
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
];
