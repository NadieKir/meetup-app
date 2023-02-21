import { ConfirmedMeetup, MeetupStatus, Topic } from "common/model";
import { Meetup, MeetupTab } from "common/types";
import { isInThePast } from ".";


export const isTopic = (meetup: Meetup): meetup is Topic => {
  return [MeetupStatus.REQUEST, MeetupStatus.DRAFT].includes((meetup as Topic).status);
}

export const isConfirmedMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return (meetup as ConfirmedMeetup).status === MeetupStatus.CONFIRMED;
}

export const isUpcomingMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return isConfirmedMeetup(meetup) && !isInThePast(meetup.start);
}

export const isFinishedMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return isConfirmedMeetup(meetup) && isInThePast(meetup.start);
}

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
