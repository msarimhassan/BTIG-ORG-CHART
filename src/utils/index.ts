import { Network, Urls, config, SEQSERVER } from '../config';
import seq from 'seq-logging';

const logger = new seq.Logger({
  serverUrl: SEQSERVER,
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

  const response = await Network.post(
    Urls.addMember(
      obj.userPrincipalName,
      obj.reportsInto,
      obj.displayName,
      obj.teamName,
      obj.teamLead,
      obj.visible
    ),
    {},
    (
      await config()
    ).headers
  );
  if (!response.ok) return alert(response.data.error);
  logMessage('Added new Team');
};

export const checkKey = (key: any, user: any) => {
  if (key === 'displayName')
    return Urls.updateDisplayName(user.userPrinicipalName, user.displayName);
  else if (key === 'teamLead')
    return Urls.updateTeamLeaderStatus(user.userPrinicipalName, user.teamLead);
  else if (key === 'horizontal')
    return Urls.updateHorizontalDimension(user.userPrinicipalName, user.horizontal);
  else if (key === 'visible') return Urls.updateVisible(user.userPrinicipalName, user.visible);
  else if (key === 'left') return Urls.updateLeftDimension(user.userPrinicipalName, user.left);
  else if (key === 'Team') return Urls.updatePartofTeam(user.userPrinicipalName, user.reportsInto);
};
