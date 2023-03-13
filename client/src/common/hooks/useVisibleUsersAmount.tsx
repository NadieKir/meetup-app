import { useState, useEffect } from 'react';

import { clamp } from 'common/helpers';
import { useCurrentWidth } from 'common/hooks';

const USER_ICON_WIDTH = 50;
const MIN_DESKTOP_WIDTH = 580;
const MIN_MOBILE_WIDTH = 320;
const GAP_PERCENT = 0.7;

const getVisibleUsersAmountByWidth = (width: number) => {
  const clampWidth = clamp(width, MIN_MOBILE_WIDTH, MIN_DESKTOP_WIDTH);

  const visibleUsersAmount = Math.floor(
    (GAP_PERCENT * clampWidth) / USER_ICON_WIDTH,
  );

  return visibleUsersAmount;
};

export function useVisibleUsersAmount() {
  const width = useCurrentWidth();

  const [visibleUsersAmount, setVisibleUsersAmount] = useState<number>(() =>
    getVisibleUsersAmountByWidth(width),
  );

  useEffect(() => {
    const visibleUsersAmount = getVisibleUsersAmountByWidth(width);

    setVisibleUsersAmount(visibleUsersAmount);
  }, [width]);

  return visibleUsersAmount;
}
