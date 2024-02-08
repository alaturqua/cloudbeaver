/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import { observer } from 'mobx-react-lite';

import { Container, Link, s, usePermission, useS, useTranslate } from '@cloudbeaver/core-blocks';
import { EAdminPermission } from '@cloudbeaver/core-root';

import type { IResultSetElementKey } from '../DatabaseDataModel/Actions/ResultSet/IResultSetDataKey';
import { useResultSetActions } from '../DatabaseDataModel/Actions/ResultSet/useResultSetActions';
import type { IDatabaseDataModel } from '../DatabaseDataModel/IDatabaseDataModel';
import type { IDatabaseResultSet } from '../DatabaseDataModel/IDatabaseResultSet';
import styles from './QuotaPlaceholder.m.css';

interface Props {
  className?: string;
  elementKey: IResultSetElementKey | undefined;
  model: IDatabaseDataModel<any, IDatabaseResultSet>;
  resultIndex: number;
  keepSize?: boolean;
  tabId: string;
}

export const QuotaPlaceholder: React.FC<React.PropsWithChildren<Props>> = observer(function QuotaPlaceholder({
  className,
  children,
  keepSize = false,
  elementKey,
  model,
  resultIndex,
  tabId,
}) {
  const translate = useTranslate();
  const admin = usePermission(EAdminPermission.admin);
  const style = useS(styles);
  const { contentAction } = useResultSetActions({ model, resultIndex });
  const limitInfo = elementKey ? contentAction.getLimitInfo(elementKey) : null;

  if (!elementKey || (elementKey && !contentAction.isContentTruncated(elementKey, tabId))) {
    return null;
  }

  return (
    <Container className={className} keepSize={keepSize} vertical center>
      <Container center vertical>
        {translate('data_viewer_presentation_value_content_was_truncated')}
        <Container noWrap center>
          <Container>{translate('data_viewer_presentation_value_content_truncated_placeholder')}</Container>
          <Container className={s(style, { limitWord: true })} zeroBasis>
            {admin ? (
              <Link
                className={s(style, { link: true })}
                title={limitInfo?.limitWithSize}
                href="https://dbeaver.com/docs/cloudbeaver/Server-configuration/#resource-quotas"
                target="_blank"
                indicator
              >
                {translate('ui_limit')}
              </Link>
            ) : (
              translate('ui_limit')
            )}
          </Container>
        </Container>
      </Container>
      <Container>{children}</Container>
    </Container>
  );
});
