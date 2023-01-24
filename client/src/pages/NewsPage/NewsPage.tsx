import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  NewsCard,
  Typography,
  TypographyComponent,
} from 'components';
import { News } from 'model';
import { NewsContext, NewsProvider } from 'common/contexts';
import { useNewsArticlesQuery } from 'common/hooks';

import styles from './NewsPage.module.scss';

export const NewsPage = () => {
  const newsStore = useContext(NewsContext);

  const navigate = useNavigate();
  const { newsArticles, isLoading } = useNewsArticlesQuery();

  if (isLoading || newsArticles === undefined)
    return <FormattedMessage id="loading" />;

  if (newsArticles === null) return <></>;

  const handleCreate = () => navigate('/news/create');

  return (
    <NewsProvider>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography
            component={TypographyComponent.Heading1}
            className={styles.heading}
          >
            <FormattedMessage id="news" />
          </Typography>
          <Button variant={ButtonVariant.Secondary} onClick={handleCreate}>
            <FormattedMessage id="createNewsButton" />
          </Button>
        </div>
        <ul className={styles.newsList}>
          {newsStore.newsArticles.map((article: News) => (
            <li key={article.id} className={styles.newsItem}>
              <NavLink to={`/news/${article.id}`}>
                <NewsCard news={article} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </NewsProvider>
  );
};
