import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, CheckRole, meetupTabs } from 'components';
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
import { history, AppRouter } from 'router';

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
                    <CheckRole roles={tab.canAccess}>{tab.component}</CheckRole>
                  }
                />
              ))}
            </Route>
            <Route path="create" element={<CreateTopicPage />} />
            <Route path=":id">
              <Route
                index
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <ViewMeetupPage />
                  </ErrorBoundary>
                }
              />
              <Route path="edit" element={<MeetupFormPage isEdit />} />
              <Route path="publish" element={<MeetupFormPage />} />
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
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <NewsFormPage />
                </ErrorBoundary>
              }
            />
            <Route path=":id">
              <Route
                index
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <ViewNewsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="edit"
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <NewsFormPage isEdit />
                  </ErrorBoundary>
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
