import React, {useState} from 'react';
import {AgGridReact} from '@ag-grid-community/react';
import {ModuleRegistry, CellValueChangedEvent} from '@ag-grid-community/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {mockData} from './mockData';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import {RowData} from './types';
import {defaultColDef, localeText} from './gridConfig';
import {colDefs} from './columnDefs';

// Registering Client-Side Row Model
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TableClient: React.FC = () => {
  // Column definitions
  const [rowData, setRowData] = useState<RowData[]>(mockData);

  const onCellValueChanged = (event: CellValueChangedEvent<RowData>) => {
    if (event.rowIndex !== null) {
      const updatedData = [...rowData];
      updatedData[event.rowIndex] = event.data!;
      setRowData(updatedData);

      alert(`Cell value changed:
      Row ID: ${event.data?.id}
      Row Index: ${event.rowIndex}
      Column: ${event.colDef.field}
      Old Value: ${event.oldValue}
      New Value: ${event.newValue}`);
    } else {
      console.error('Row index is null');
    }
  };

  return (
    <div className='ag-theme-alpine' style={{height: 500, width: '100%'}}>
      <AgGridReact<RowData>
        localeText={localeText}
        rowData={rowData}
        columnDefs={colDefs} // Using shared column definitions
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

export default TableClient;
