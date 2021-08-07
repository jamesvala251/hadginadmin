import { Moment } from 'moment';
import { IMessageQueueTopic } from 'app/shared/model/message-queue-topic.model';
import { Channel } from 'app/shared/model/enumerations/channel.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface ICommunicationChannel {
  id?: string;
  channelName?: Channel;
  description?: string;
  status?: Status;
  modifiedOn?: Moment;
  modifiedBy?: string;
  messageQueueTopics?: IMessageQueueTopic[];
}

export class CommunicationChannel implements ICommunicationChannel {
  constructor(
    public id?: string,
    public channelName?: Channel,
    public description?: string,
    public status?: Status,
    public modifiedOn?: Moment,
    public modifiedBy?: string,
    public messageQueueTopics?: IMessageQueueTopic[]
  ) {}
}
