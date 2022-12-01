import { Network, Urls, config } from '../config';
import seq from 'seq-logging';

const logger = new seq.Logger({
  serverUrl: 'http://localhost:5341/',
  onError: (e) => console.log(e),
});

export const logMessage = (Message: any) => {
  logger.emit({
    timestamp: new Date(),
    level: 'Information',
    messageTemplate: Message,
  });
};

export const AddNewMember = async (e: any, obj: any) => {
  e.stopPropagation();
  const response = await Network.post(Urls.addMemeber, obj, (await config()).headers);
  if (!response.ok) return alert(response.data.error);
  logMessage('Added new Team');
};
