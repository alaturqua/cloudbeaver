/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { computed, makeObservable } from 'mobx';

import { DataTypeLogicalOperation, ResultDataFormat, SqlResultColumn } from '@cloudbeaver/core-sdk';

import type { IDatabaseDataSource } from '../../IDatabaseDataSource';
import type { IDatabaseResultSet } from '../../IDatabaseResultSet';
import { databaseDataAction } from '../DatabaseDataActionDecorator';
import { DatabaseDataResultAction } from '../DatabaseDataResultAction';
import type { IResultSetContentValue } from './IResultSetContentValue';
import type { IResultSetColumnKey, IResultSetElementKey, IResultSetRowKey } from './IResultSetDataKey';
import { isResultSetContentValue } from './isResultSetContentValue';
import { ResultSetDataKeysUtils } from './ResultSetDataKeysUtils';
import type { IResultSetValue } from './ResultSetFormatAction';

@databaseDataAction()
export class ResultSetDataAction extends DatabaseDataResultAction<IResultSetElementKey, IDatabaseResultSet> {
  static dataFormat = [ResultDataFormat.Resultset];

  get rows(): IResultSetValue[][] {
    return this.result.data?.rows || [];
  }

  get columns(): SqlResultColumn[] {
    return this.result.data?.columns || [];
  }

  constructor(source: IDatabaseDataSource<any, IDatabaseResultSet>) {
    super(source);
    makeObservable(this, {
      rows: computed,
      columns: computed,
    });
  }

  getIdentifier(key: IResultSetElementKey): string {
    return ResultSetDataKeysUtils.serialize(key.column);
  }

  serialize(key: IResultSetElementKey): string {
    return ResultSetDataKeysUtils.serializeElementKey(key);
  }

  getDefaultKey(): IResultSetElementKey {
    return {
      row: {
        index: 0,
        subIndex: 0,
      },
      column: {
        index: 0,
      },
    };
  }

  insertRow(row: IResultSetRowKey, value: IResultSetValue[], shift = 0): IResultSetRowKey | undefined {
    if (this.result.data?.rows) {
      const index = row.index + shift;
      this.result.data.rows.splice(index, 0, value);

      return { index, subIndex: 0 };
    }

    return undefined;
  }

  removeRow(row: IResultSetRowKey, shift = 0): IResultSetRowKey | undefined {
    if (this.result.data?.rows) {
      const index = row.index + shift;
      this.result.data.rows.splice(index, 1);

      return { index: index - 1, subIndex: 0 };
    }
    return undefined;
  }

  setRowValue(row: IResultSetRowKey, value: IResultSetValue[], shift = 0): void {
    if (this.result.data?.rows) {
      this.result.data.rows[row.index + shift] = value;
    }
  }

  getRowValue(row: IResultSetRowKey): IResultSetValue[] | undefined {
    if (row.index >= this.rows.length) {
      return undefined;
    }

    return this.rows[row.index];
  }

  getCellValue(cell: IResultSetElementKey): IResultSetValue | undefined {
    if (cell.row === undefined || cell.column === undefined || cell.row.index >= this.rows.length || cell.column.index >= this.columns.length) {
      return undefined;
    }

    return this.rows[cell.row.index][cell.column.index];
  }

  getContent(cell: IResultSetElementKey): IResultSetContentValue | null {
    const value = this.getCellValue(cell);

    if (isResultSetContentValue(value)) {
      return value;
    }

    return null;
  }

  findColumnKey(predicate: (column: SqlResultColumn) => boolean): IResultSetColumnKey | undefined {
    const index = this.columns.findIndex(predicate);

    return index === -1 ? undefined : { index };
  }

  getColumn(key: IResultSetColumnKey): SqlResultColumn | undefined {
    if (key.index >= this.columns.length) {
      return undefined;
    }

    return this.columns[key.index];
  }

  getColumnOperations(key: IResultSetColumnKey): DataTypeLogicalOperation[] {
    const column = this.getColumn(key);

    if (!column) {
      return [];
    }

    return column.supportedOperations.filter(operation => operation.argumentCount === 1 || operation.argumentCount === 0);
  }
}
