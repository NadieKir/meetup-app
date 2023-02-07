import { isFinishedMeetup, Meetup, MeetupStatus } from "model";
import { MeetupTab } from "types";

export const getMeetupTab = (meetup: Meetup) : MeetupTab=> {
    switch(meetup.status) {
      case MeetupStatus.DRAFT:
        return MeetupTab.Topics;
      case MeetupStatus.REQUEST:
        return MeetupTab.OnModeration;
      case MeetupStatus.CONFIRMED:
        return isFinishedMeetup(meetup) ? MeetupTab.Finished : MeetupTab.Upcoming;
    };
};