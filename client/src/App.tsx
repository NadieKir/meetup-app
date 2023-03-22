import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PrivateRoute, meetupTabs, UserStatus } from 'components';
import {
  MeetupPage,
  NotFoundPage,
  NewsPage,
  ViewMeetupPage,
  ViewNewsPage,
  Layout,
  LoginPage,
  CreateTopicPage,
  NewsFormPage,
  MeetupFormPage,
  ForbiddenPage,
} from 'pages';
import {
  MeetupListProvider,
  NewsListProvider,
  UserContext,
} from 'common/contexts';
import { UserRole } from 'common/model';
import { history, AppRouter } from 'common/router';

function App() {
  const { currentUserMeetupTabs } = useContext(UserContext);
  const initialTab = currentUserMeetupTabs[0];

  return (
    <AppRouter history={history}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/meetups" />} />
          <Route path="meetups">
            <Route
              element={
                <MeetupListProvider>
                  <MeetupPage />
                </MeetupListProvider>
              }
            >
              <Route
                index
                element={
                  <Navigate
                    replace
                    to={initialTab ? initialTab.link : '/meetups'}
                  />
                }
              />
              {meetupTabs.map((tab) => (
                <Route
                  key={tab.link}
                  path={tab.link}
                  element={
                    <PrivateRoute roles={tab.canAccess}>
                      {tab.component}
                    </PrivateRoute>
                  }
                />
              ))}
            </Route>
            <Route
              path="create"
              element={
                <PrivateRoute roles={[UserStatus.AUTHORIZED]}>
                  <CreateTopicPage />
                </PrivateRoute>
              }
            />
            <Route path=":id">
              <Route index element={<ViewMeetupPage />} />
              <Route
                path="edit"
                element={
                  <PrivateRoute roles={[UserRole.CHIEF]}>
                    <MeetupFormPage isEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="publish"
                element={
                  <PrivateRoute roles={[UserRole.CHIEF]}>
                    <MeetupFormPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route path="news">
            <Route
              index
              element={
                <NewsListProvider>
                  <NewsPage />
                </NewsListProvider>
              }
            />
            <Route
              path="create"
              element={
                <PrivateRoute roles={[UserRole.CHIEF]}>
                  <NewsFormPage />
                </PrivateRoute>
              }
            />
            <Route path=":id">
              <Route index element={<ViewNewsPage />} />
              <Route
                path="edit"
                element={
                  <PrivateRoute roles={[UserRole.CHIEF]}>
                    <NewsFormPage isEdit />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="forbidden" element={<ForbiddenPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </AppRouter>
  );
}

export default App;
