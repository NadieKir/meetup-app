import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { meetupTabsLinks, meetupTabToDescriptor } from 'components';
import {
  MeetupPage,
  NotFoundPage,
  NewsPage,
  ViewMeetupPage,
  ViewNewsPage,
  Layout,
  LoginPage,
} from 'pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate replace to="/meetups" />} />
          <Route path="meetups">
            <Route element={<MeetupPage />}>
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
              <Route index element={<ViewMeetupPage />} />
              <Route path="edit" element={<div>Edit meetup</div>} />
            </Route>
          </Route>
          <Route path="news">
            <Route index element={<NewsPage />} />
            <Route path="create" element={<div>Create news article</div>} />
            <Route path=":id">
              <Route index element={<ViewNewsPage />} />
              <Route path="edit" element={<div>Edit news article</div>} />
            </Route>
          </Route>
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
