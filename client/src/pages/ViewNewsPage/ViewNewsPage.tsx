import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import classNames from 'classnames';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
} from 'components';
import { useNewsArticleQuery } from 'common/hooks';
import { UserContext, NewsContext } from 'common/contexts';
import { UserRole } from 'model';
import { NotFoundPage } from 'pages';

import styles from './ViewNewsPage.module.scss';
import defaultImage from 'assets/images/default-background-blue.jpg';

export const ViewNewsPage = () => {
  const intl = useIntl();

  const userStore = useContext(UserContext);
  const newsStore = useContext(NewsContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { newsArticle, isLoading } = useNewsArticleQuery(id!);

  if (isLoading || newsArticle === undefined)
    return <FormattedMessage id="loading" />;

  if (newsArticle === null) return <></>;

  const handleGoBack = () => navigate(-1);
  const handleEdit = () => navigate(pathname + '/edit');
  const handleDelete = () => {
    newsStore.deleteNews(newsArticle.id);
    navigate(-1);
  };

  const renderImage = (): JSX.Element => {
    return (
      <figure className={classNames(styles.section, styles.imageWrapper)}>
        <img
          className={styles.image}
          src={newsArticle.image ?? defaultImage}
          alt={intl.formatMessage({ id: 'newsPhotoAlt' })}
        />
      </figure>
    );
  };

  const renderContent = (): JSX.Element => (
    <div className={classNames(styles.textSection, styles.main)}>
      <Typography
        className={styles.title}
        component={TypographyComponent.Heading2}
      >
        {newsArticle.title}
      </Typography>
      <Typography
        className={styles.text}
        component={TypographyComponent.Paragraph}
      >
        {newsArticle.text}
      </Typography>
    </div>
  );

  const renderActions = (): JSX.Element => {
    return (
      <div className={classNames(styles.textSection, styles.actions)}>
        <Button variant={ButtonVariant.Default} onClick={handleGoBack}>
          <FormattedMessage id="goBackButton" />
        </Button>
        {userStore.user?.roles === UserRole.CHIEF && (
          <div className={styles.actionGroup}>
            <Button variant={ButtonVariant.Secondary} onClick={handleDelete}>
              <FormattedMessage id="deleteButton" />
            </Button>
            <Button variant={ButtonVariant.Primary} onClick={handleEdit}>
              <FormattedMessage id="editButton" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage id="newsView" />
      </Typography>
      <div className={styles.contentWrapper}>
        {renderImage()}
        {renderContent()}
        {renderActions()}
      </div>
    </section>
  );
};
