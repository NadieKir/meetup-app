import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';

import {
  Button,
  ButtonVariant,
  LanguageSelector,
  Tooltip,
  TooltipVariant,
  Typography,
  UserPreview,
  UserPreviewVariant,
} from 'components';
import { UserContext } from 'common/contexts';

import styles from './Header.module.scss';
import logo from 'assets/images/logo.svg';
import login from './login.svg';

export const Header = observer((): JSX.Element => {
  const intl = useIntl();
  const { user, logout } = useContext(UserContext);

  const renderLogoutButton = () => {
    const handleLogout = () => logout();

    return (
      <Button onClick={handleLogout} variant={ButtonVariant.Primary}>
        <FormattedMessage id="logOutButton" />
      </Button>
    );
  };

  const renderUserPreview = () =>
    user ? (
      <Tooltip element={renderLogoutButton()} variant={TooltipVariant.White}>
        <UserPreview variant={UserPreviewVariant.Header} user={user} />
      </Tooltip>
    ) : (
      <NavLink className={styles.loginBtn} to="/login">
        <img
          className={styles.loginImage}
          src={login}
          alt={intl.formatMessage({ id: 'loginAlt' })}
        />
        <Typography>
          <FormattedMessage id="signInButton" />
        </Typography>
      </NavLink>
    );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.tools}>
          <LanguageSelector />
        </div>

        <div className={styles.navWrapper}>
          <NavLink to="/meetups">
            <img
              src={logo}
              className={styles.logo}
              alt={intl.formatMessage({ id: 'logoAlt' })}
            />
          </NavLink>
          <nav className={classNames(styles.nav, styles.hiddenOnSmall)}>
            <NavLink
              to="/meetups"
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>
                <FormattedMessage id="meetups" />
              </Typography>
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>
                <FormattedMessage id="news" />
              </Typography>
            </NavLink>
          </nav>
          {renderUserPreview()}
        </div>

        <div className={styles.navAdaptiveWrapper}>
          <nav className={styles.nav}>
            <NavLink
              to="/meetups"
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>
                <FormattedMessage id="meetups" />
              </Typography>
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>
                <FormattedMessage id="news" />
              </Typography>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
});
