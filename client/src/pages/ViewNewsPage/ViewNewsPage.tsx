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
import { NotFoundPage } from 'pages';

import styles from './ViewNewsPage.module.scss';
import defaultImage from 'assets/images/default-background-blue.jpg';

export const ViewNewsPage = () => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { newsArticle, isLoading } = useNewsArticleQuery(id!);

  const handleBack = (): void => navigate(-1);
  const handleEdit = (): void => navigate(pathname + '/edit');

  if (isLoading || newsArticle === undefined) {
    return <div>Загрузка...</div>;
  }

  if (newsArticle === null) {
    return <NotFoundPage />;
  }

  const { image, title, text } = newsArticle;

  const renderImage = (): JSX.Element => {
    return (
      <figure className={classNames(styles.section, styles.imageWrapper)}>
        <img
          className={styles.image}
          src={image ?? defaultImage}
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
        {title}
      </Typography>
      <Typography
        className={styles.text}
        component={TypographyComponent.Paragraph}
      >
        {text}
      </Typography>
    </div>
  );

  const renderActions = (): JSX.Element => {
    return (
      <div className={classNames(styles.textSection, styles.actions)}>
        <Button variant={ButtonVariant.Default} onClick={handleBack}>
          <FormattedMessage id="goBackButton" />
        </Button>
        <div className={styles.actionGroup}>
          <Button variant={ButtonVariant.Secondary} onClick={handleEdit}>
            <FormattedMessage id="editButton" />
          </Button>
        </div>
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
