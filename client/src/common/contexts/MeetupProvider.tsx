import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import meetupListStore, { MeetupListStore } from 'stores/MeetupListStore';

export const MeetupListContext =
  createContext<MeetupListStore>(meetupListStore);

export const MeetupListProvider = observer(
  ({ children }: PropsWithChildren) => {
    return (
      <MeetupListContext.Provider value={meetupListStore}>
        {children}
      </MeetupListContext.Provider>
    );
  },
);
