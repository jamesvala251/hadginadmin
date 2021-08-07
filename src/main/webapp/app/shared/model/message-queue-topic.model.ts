import { Moment } from 'moment';
import { ICommunicationChannel } from 'app/shared/model/communication-channel.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IMessageQueueTopic {
  id?: string;
  topicName?: string;
  description?: string;
  status?: Status;
  modifiedOn?: Moment;
  modifiedBy?: string;
  communicationChannels?: ICommunicationChannel[];
}

export class MessageQueueTopic implements IMessageQueueTopic {
  constructor(
    public id?: string,
    public topicName?: string,
    public description?: string,
    public status?: Status,
    public modifiedOn?: Moment,
    public modifiedBy?: string,
    public communicationChannels?: ICommunicationChannel[]
  ) {}
}
