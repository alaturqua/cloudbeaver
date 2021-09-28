/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import type { DialogComponent } from '../CommonDialog/CommonDialogService';
import { ConfirmationDialog } from '../CommonDialog/ConfirmationDialog';
import type { ConfirmationDialogPayload } from '../CommonDialog/ConfirmationDialog';

export const ConfirmationDialogDelete: DialogComponent<ConfirmationDialogPayload> = function ConfirmationDialogDelete({
  payload,
  ...rest
}) {
  return (
    <ConfirmationDialog
      payload={{ ...payload, icon: '/icons/error_icon.svg', bigIcon: true }}
      {...rest}
    />
  );
};