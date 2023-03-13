import { render, screen } from '@testing-library/react';

import { UserPreview, UserPreviewVariant } from './UserPreview';

const mockUser = {
  id: '4c2750f9-96e0-44e4-b620-c48782cc1e82',
  name: 'Genevieve',
  password: 'private',
  surname: 'Tromp',
  post: 'District Group Strategist',
  roles: 'CHIEF',
};

it('Renders user initials', () => {
  render(<UserPreview variant={UserPreviewVariant.Default} user={mockUser} />);

  expect(
    screen.getByText((content, element) =>
      element!.classList.contains('initials'),
    ),
  ).toHaveTextContent('GT');
});

it('Renders only user photo if variant Image chosen', () => {
  render(<UserPreview variant={UserPreviewVariant.Image} user={mockUser} />);

  expect(screen.queryByText(/Genevieve/)).not.toBeInTheDocument();
});
