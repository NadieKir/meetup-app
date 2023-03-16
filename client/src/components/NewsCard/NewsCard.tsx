import { FormattedDate } from 'react-intl';

import { Typography, TypographyComponent } from 'components/Typography';
import { News } from 'common/model';
import { removeHTMLTags } from 'common/helpers';

import styles from './NewsCard.module.scss';
import defaultImage from 'assets/images/default-image.jpg';

interface NewsCardProps {
  news: News;
}

export const NewsCard = ({ news }: NewsCardProps): JSX.Element => {
  const { publicationDate, title, content, image } = news;

  return (
    <article className={styles.news}>
      <figure className={styles.image}>
        <img src={image || defaultImage} alt={title} />
      </figure>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Typography
            component={TypographyComponent.Heading2}
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            component={TypographyComponent.Paragraph}
            className={styles.text}
          >
            {removeHTMLTags(content)}
          </Typography>
        </div>
        <Typography
          component={TypographyComponent.Paragraph}
          className={styles.date}
        >
          <FormattedDate value={publicationDate} />
        </Typography>
      </div>
    </article>
  );
};
