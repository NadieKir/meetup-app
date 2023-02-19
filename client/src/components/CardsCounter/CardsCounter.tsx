import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { LocalizationContext } from 'common/contexts';
import { Locale } from 'common/i18n';
import { MeetupTab } from 'common/types/meetupTab';

import styles from './CardsCounter.module.scss';

interface CardsCounterProps {
  amount: number;
  variant: MeetupTab;
}

const getRuCounterEnding = (num: number, variant: MeetupTab) => {
  const lastNumber = num % 10;
  const lastTwoNumbers = num % 100;

  switch (variant) {
    case MeetupTab.Topics:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return 'тем предложено';
      if ([2, 3, 4].includes(lastNumber)) return 'темы предложено';
      if (lastNumber === 1) return 'тема предложена';
      break;
    case MeetupTab.OnModeration:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return 'митапов на модерации';
      if ([2, 3, 4].includes(lastNumber)) return 'митапа на модерации';
      if (lastNumber === 1) return 'митап на модерации';
      break;
    case MeetupTab.Upcoming:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return 'митапов опубликовано';
      if ([2, 3, 4].includes(lastNumber)) return 'митапа опубликовано';
      if (lastNumber === 1) return 'митап опубликован';
      break;
    case MeetupTab.Finished:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return 'митапов прошло';
      if ([2, 3, 4].includes(lastNumber)) return 'митапа прошло';
      if (lastNumber === 1) return 'митап прошёл';
      break;
  }
};

export const CardsCounter = ({ amount, variant }: CardsCounterProps) => {
  const localeStore = useContext(LocalizationContext);
  const intl = useIntl();

  const renderLocaleEnding = () => {
    if (localeStore.locale === Locale.RUSSIAN)
      return getRuCounterEnding(amount, variant);

    switch (variant) {
      case MeetupTab.Topics:
        return (
          <FormattedMessage
            id="topicsCounter"
            values={{
              cardsAmount: amount,
              adjective: intl.formatMessage({ id: 'suggestedAdj' }),
            }}
          />
        );
      case MeetupTab.OnModeration:
        return (
          <FormattedMessage
            id="meetupsCounter"
            values={{
              cardsAmount: amount,
              adjective: intl.formatMessage({ id: 'onModerationAdj' }),
            }}
          />
        );
      case MeetupTab.Upcoming:
        return (
          <FormattedMessage
            id="meetupsCounter"
            values={{
              cardsAmount: amount,
              adjective: intl.formatMessage({ id: 'upcomingAdj' }),
            }}
          />
        );
      case MeetupTab.Finished:
        return (
          <FormattedMessage
            id="meetupsCounter"
            values={{
              cardsAmount: amount,
              adjective: intl.formatMessage({ id: 'publishedAdj' }),
            }}
          />
        );
    }
  };

  return (
    <div className={styles.counter}>
      {amount} {renderLocaleEnding()}
    </div>
  );
};
