import { Network, Urls, config, SEQSERVERURL, SEQSERVERAPIKEY } from '../config';
import seq from 'seq-logging';

const logger = new seq.Logger({
  serverUrl: SEQSERVERURL,
  apiKey: SEQSERVERAPIKEY,
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

export const manageteamNamefont = (teamName: String) => {
  const length = teamName?.length;
  if (!teamName) {
    return {
      display: 'inline-block',
      height: '100%',
      fontSize: '0.6vw',
    };
  }
  if (length < 15) {
    return { fontSize: '0.5vw' };
  }
  if (length > 15 && length < 30) {
    return { fontSize: '0.5vw' };
  }
  if (length > 30 && length < 50) {
    return { fontSize: '0.4vw' };
  }
  return {};
};
