// @ts-ignore
import React from 'react';

import classNames from 'classnames';

import { TColor } from '@/styles/color/color.variables';

// import { Ticon } from '../../../../public/svgtocss/icon-type';
import { Ticon } from '@/../public/svgtocss/icon-type';

export const Icon = ({
  className = '',
  ...props
}: React.SVGProps<SVGSVGElement> & {
  icon: Ticon;
  className?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <i className={classNames(props.icon, className)} {...props} />;
};
