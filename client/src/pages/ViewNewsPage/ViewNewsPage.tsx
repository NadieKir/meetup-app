import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer, useLocalObservable } from 'mobx-react-lite';
import parse from 'html-react-parser';
import classNames from 'classnames';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
} from 'components';
import { NewsStore } from 'stores/NewsStore';
import { UserContext } from 'common/contexts';
import { usePushNotification } from 'common/hooks';

import styles from './ViewNewsPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';

export const ViewNewsPage = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { pushSuccess } = usePushNotification();

  const { isChief } = useContext(UserContext);
  const { newsArticle, deleteNews, isLoading, error } = useLocalObservable(
    () => new NewsStore(id!),
  );

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!newsArticle) throw error;

  const handleGoBack = () => navigate(-1);
  const handleEdit = () => navigate(pathname + '/edit');
  const handleDelete = () => {
    deleteNews(newsArticle.id);
    pushSuccess(intl.formatMessage({ id: 'newsDeleted' }));
    handleGoBack();
  };

  const renderImage = (): JSX.Element => {
    return (
      <figure className={classNames(styles.section, styles.imageWrapper)}>
        <img
          className={styles.image}
          src={newsArticle.image || defaultImage}
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
      <div className={styles.text}>{parse(newsArticle.content)}</div>
    </div>
  );

  const renderActions = (): JSX.Element => (
    <div className={classNames(styles.textSection, styles.actions)}>
      <Button variant={ButtonVariant.Default} onClick={handleGoBack}>
        <FormattedMessage id="goBackButton" />
      </Button>
    </div>
  );

  const renderPrivilegedActions = () => {
    if (!isChief) return;

    return (
      <div className={styles.actionGroup}>
        <Button variant={ButtonVariant.Secondary} onClick={handleDelete}>
          <FormattedMessage id="deleteButton" />
        </Button>
        <Button variant={ButtonVariant.Primary} onClick={handleEdit}>
          <FormattedMessage id="editButton" />
        </Button>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.headingWrapper}>
        <Typography
          className={styles.heading}
          component={TypographyComponent.Heading1}
        >
          <FormattedMessage id="newsView" />
        </Typography>
        {renderPrivilegedActions()}
      </div>

      <div className={styles.contentWrapper}>
        {renderImage()}
        {renderContent()}
        {renderActions()}
      </div>
    </section>
  );
});
