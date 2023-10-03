/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

export function selectFiles(callback: (files: FileList | null) => any): void {
  let removed = false;
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = () => {
    callback(input.files);
    removed = true;
    input.remove();
  };
  input.click();

  setTimeout(() => {
    if (!removed) {
      input.remove();
    }
  }, 30 * 60 * 1000);
}
