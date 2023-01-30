import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  NewsCard,
  Typography,
  TypographyComponent,
} from 'components';
import { News, UserRole } from 'model';
import { NewsListStore } from 'store';
import { UserContext } from 'common/contexts';

import styles from './NewsPage.module.scss';

export const NewsPage = observer(() => {
  const navigate = useNavigate();

  const userStore = useContext(UserContext);
  const { newsArticles, isLoading } = useLocalObservable(
    () => new NewsListStore(),
  );

  if (isLoading) return <FormattedMessage id="loading" />;

  const handleCreate = () => navigate('/news/create');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography
          component={TypographyComponent.Heading1}
          className={styles.heading}
        >
          <FormattedMessage id="news" />
        </Typography>
        {userStore.user?.roles === UserRole.CHIEF && (
          <Button variant={ButtonVariant.Secondary} onClick={handleCreate}>
            <FormattedMessage id="createNewsButton" />
          </Button>
        )}
      </div>
      <ul className={styles.newsList}>
        {newsArticles.map((article: News) => (
          <li key={article.id} className={styles.newsItem}>
            <NavLink to={`/news/${article.id}`}>
              <NewsCard news={article} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});
