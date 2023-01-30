import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import {
  ErrorFallback,
  meetupTabsLinks,
  meetupTabToDescriptor,
} from 'components';
import { MeetupListProvider, NewsListProvider } from 'common/contexts';
import { history, AppRouter } from 'common/router';
import {
  MeetupPage,
  NotFoundPage,
  NewsPage,
  ViewMeetupPage,
  ViewNewsPage,
  Layout,
  LoginPage,
  CreateNewsPage,
  EditNewsPage,
} from 'pages';

function App() {
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
                element={<Navigate replace to={meetupTabsLinks[0]} />}
              />
              {meetupTabsLinks.map((tabLink) => (
                <Route
                  key={tabLink}
                  path={tabLink}
                  element={meetupTabToDescriptor[tabLink].component}
                />
              ))}
            </Route>
            <Route path="create" element={<div>Create meetup page</div>} />
            <Route path=":id">
              <Route
                index
                element={
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <ViewMeetupPage />
                  </ErrorBoundary>
                }
              />
              <Route path="edit" element={<div>Edit meetup</div>} />
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
                  <CreateNewsPage />
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
                    <EditNewsPage />
                  </ErrorBoundary>
                }
              />
            </Route>
          </Route>
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </AppRouter>
  );
}

export default App;
