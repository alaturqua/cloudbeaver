/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2024 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */
import type { ButtonProps } from 'reakit/ts';
import styled, { css } from 'reshadow';

import type { ComponentStyle } from '@cloudbeaver/core-theming';

import { IconButton } from '../IconButton';
import { useStyles } from '../useStyles';
import moduleStyles from './MenuBarSmallItem.m.css';
import { useS } from '../useS';
import { s } from '../s';

export const styles = css`
  icon-box {
    composes: theme-form-element-radius theme-text-primary theme-ripple from global;
    box-sizing: border-box;
    overflow: hidden;
    padding: 4px !important;
    margin: 2px !important;
    flex-shrink: 0;
    height: 24px !important;
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 2px;
    user-select: none;
    outline: none;

    & icon-label {
      text-transform: uppercase;
      font-weight: 500;
    }
  }
`;

interface Props extends Omit<ButtonProps, 'style' | 'icon'> {
  icon?: string;
  viewBox?: string;
  style?: ComponentStyle;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const MenuBarSmallItem: React.FC<React.PropsWithChildren<Props>> = function MenuBarSmallItem({
  icon,
  viewBox,
  children,
  className,
  style,
  onClick,
  ...rest
}) {
  const moduleStyle = useS(moduleStyles);
  // TODO: replace IconButton with StaticImage / Icon
  // TODO: use button for icon-box (maybe)
  return styled(useStyles(styles, style))(
    <icon-box className={className} tabIndex={0} onClick={onClick}>
      {icon && <IconButton className={s(moduleStyle, { iconButton: true })} name={icon} viewBox={viewBox} {...rest} />}
      {children && <icon-label>{children}</icon-label>}
    </icon-box>,
  );
};
