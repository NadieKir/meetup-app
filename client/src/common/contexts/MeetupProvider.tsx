import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import meetupStore, { MeetupStore } from 'store/meetup';

export const MeetupContext = createContext<MeetupStore>(meetupStore);

export const MeetupProvider = observer(({ children }: PropsWithChildren) => {
  return (
    <MeetupContext.Provider value={meetupStore}>
      {children}
    </MeetupContext.Provider>
  );
});
