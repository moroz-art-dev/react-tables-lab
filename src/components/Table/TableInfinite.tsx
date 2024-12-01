import React, {useEffect, useState} from 'react';
import {AgGridReact} from '@ag-grid-community/react';
import {
  ModuleRegistry,
  IDatasource,
  IGetRowsParams,
} from '@ag-grid-community/core';
import {InfiniteRowModelModule} from '@ag-grid-community/infinite-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import {RowData} from './types';
import {defaultColDef, localeText} from './gridConfig';
import {colDefs} from './columnDefs';

// Registering Infinite Row Model
ModuleRegistry.registerModules([InfiniteRowModelModule]);

const TableInfinite: React.FC = () => {
  const [allData, setAllData] = useState<RowData[]>([]);

  // Fetch mock data initially
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/mockData.json');
      const data: RowData[] = await response.json();
      setAllData(data);
    };

    fetchData();
  }, []);

  // Define the data source
  const datasource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log('Requesting rows:', params.startRow, params.endRow);
      console.log('Sort model:', params.sortModel);
      console.log('Filter model:', params.filterModel);

      // Simulate server-side slicing
      const startRow = params.startRow;
      const endRow = params.endRow;

      // Use allData for local processing
      const updatedAllData = [...allData]; // Ensure we are not mutating state directly

      // Apply filters
      const filteredData = updatedAllData.filter(row => {
        for (const colId in params.filterModel) {
          const filter = params.filterModel[colId];

          // Text filter (e.g., make, model)
          if (filter.filterType === 'text' && colId in row) {
            const value = String(row[colId as keyof RowData]).toLowerCase();
            if (
              filter.type === 'startsWith' &&
              !value.startsWith(filter.filter.toLowerCase())
            ) {
              return false;
            }
            if (
              filter.type === 'contains' &&
              !value.includes(filter.filter.toLowerCase())
            ) {
              return false;
            }
            if (
              filter.type === 'notContains' &&
              value.includes(filter.filter.toLowerCase())
            ) {
              return false;
            }
          }

          // Number filter (e.g., price)
          if (filter.filterType === 'number' && colId in row) {
            const value = Number(row[colId as keyof RowData]);
            const filterValue = Number(filter.filter);
            if (filter.type === 'equals' && value !== filterValue) {
              return false;
            }
            if (filter.type === 'notEqual' && value === filterValue) {
              return false;
            }
            if (filter.type === 'lessThan' && value >= filterValue) {
              return false;
            }
            if (filter.type === 'greaterThan' && value <= filterValue) {
              return false;
            }
            if (filter.type === 'lessThanOrEqual' && value > filterValue) {
              return false;
            }
            if (filter.type === 'greaterThanOrEqual' && value < filterValue) {
              return false;
            }
          }
        }
        return true;
      });

      // Apply sorting
      const sortedData = filteredData.sort((a, b) => {
        if (!params.sortModel || params.sortModel.length === 0) return 0;

        const sort = params.sortModel[0];
        const valueA = a[sort.colId as keyof RowData];
        const valueB = b[sort.colId as keyof RowData];

        if (valueA < valueB) return sort.sort === 'asc' ? -1 : 1;
        if (valueA > valueB) return sort.sort === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginate data
      const rows = sortedData.slice(startRow, endRow);

      // Send data to the grid
      params.successCallback(rows, filteredData.length);
    },
  };

  return (
    <div className='ag-theme-alpine' style={{height: 500, width: '100%'}}>
      <AgGridReact<RowData>
        defaultColDef={defaultColDef}
        localeText={localeText}
        columnDefs={colDefs}
        rowModelType='infinite'
        datasource={datasource}
        cacheBlockSize={100} // Block size for infinite loading
        maxBlocksInCache={10} // Max cached blocks
      />
    </div>
  );
};

export default TableInfinite;
