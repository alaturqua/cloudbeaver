/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { IMenuData, IMenuItem } from '@cloudbeaver/core-view';

export interface IContextMenuItemProps {
  item: IMenuItem;
  menuData: IMenuData;
  onClick: () => void;
}
