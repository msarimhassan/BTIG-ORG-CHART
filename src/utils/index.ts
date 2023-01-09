import { Network, Urls, config, SEQSERVERURL, SEQSERVERAPIKEY } from '../config';
import { message } from 'antd';
import seq from 'seq-logging';
import publicClientApplication from '../configuration';

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

export const AddNewMember = async (obj: any) => {
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
  if (!response.ok) {
    message.error('Something went wrong, please refresh and try again!');
    // eslint-disable-next-line no-throw-literal
    return false;
  }
  message.success('New member is added successfully!');
  logMessage('Added new Team');
  return true;
};

export const getApiRoute = (key: any, user: any) => {
  if (key === 'displayName')
    return Urls.updateDisplayName(user.userPrinicipalName, user.displayName);
  else if (key === 'teamLead')
    return Urls.updateTeamLeaderStatus(user.userPrinicipalName, user.teamLead);
  else if (key === 'horizontal')
    return Urls.updateHorizontalDimension(user.userPrinicipalName, user.horizontal);
  else if (key === 'visible') return Urls.updateVisible(user.userPrinicipalName, user.visible);
  else if (key === 'left') return Urls.updateLeftDimension(user.userPrinicipalName, user.left);
  else if (key === 'reportsInto')
    return Urls.updateMember(user.userPrinicipalName, user.reportsInto);
};

export const filterNodes = (data: any) => {
  const node = data?.find(
    (item: any) =>
      (item.teamLead === true && item.directTeamMembers.length > 0) ||
      (item.teamLead === true && item.directTeamMembers.length === 0)
  );
  return node;
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
    return { fontSize: '0.5vw', fontWeight: 'bold' };
  }
  if (length > 15 && length < 30) {
    return { fontSize: '0.5vw', fontWeight: 'bold' };
  }
  if (length > 30 && length < 50) {
    return { fontSize: '0.4vw', fontWeight: 'bold' };
  }
  return {};
};

export const UpdateMember = async (key: any, values: any) => {
  const URL = getApiRoute(key, values);
  const response = await Network.patch(URL, {}, (await config()).headers);
  if (!response.ok) alert('Error in updating the member');
};

export const handleUpgrade = async (oldName: string, newTeam: string) => {
  const response = await Network.patch(
    Urls.updateTeamName(oldName, newTeam),
    {},
    (
      await config()
    ).headers
  );
  if (!response.ok) {
    alert('Error in updating teamName');
    return false;
  }
  return true;
};

export const compareValues = async (initialValues: any, values: any, oldTeamName: any) => {
  if (initialValues.displayName !== values.displayName) {
    await UpdateMember('displayName', values);
  }

  if (initialValues.teamName !== values.teamName) {
    await handleUpgrade(oldTeamName, values.teamName);
  }

  if (initialValues.teamLead !== values.teamLead) {
    await UpdateMember('teamLead', values);
  }

  if (initialValues.horizontal !== values.horizontal) {
    await UpdateMember('horizontal', values);
  }

  if (initialValues.visible !== values.visible) {
    await UpdateMember('visible', values);
  }

  if (initialValues.left !== values.left) {
    await UpdateMember('left', values);
  }
};

export const logout = () => {
  localStorage.clear();
  publicClientApplication.logoutRedirect();
  logMessage(`User logout from the app`);
};

export const getOptions = (data: any) => {
  const options = data
    ?.filter((item: any) => item.teamLead)
    .map((item: any, index: any) => {
      if (!item.teamLead || !item.teamName) return null;
      return {
        label: item.teamName,
        key: index,
        value: item.userPrincipalName,
      };
    })
    .filter((item: any) => item != null);
  return options;
};

export const getReportsInto = (data: any, reportsInto: any) => {
  const reports = data
    ?.filter((item: any) => item.teamLead)
    .find((item: any) => item.userPrincipalName === reportsInto)?.teamName;
  return reports;
};

export const deleteTeamMember = async (upn: any) => {
  const response = await Network.delete(Urls.deleteMember(upn), {}, (await config()).headers);
  if (!response.ok) {
    message.error('Failed to delete');
    return false;
  }
  logMessage(`Deleted Member ${upn}`);
  return true;
};

export const compareMemberValues = async (initialValues: any, values: any) => {
  if (initialValues.displayName !== values.displayName) {
    await UpdateMember('displayName', values);
  }

  if (initialValues.reportsInto !== values.reportsInto) {
    await UpdateMember('reportsInto', values);
  }

  if (initialValues.teamLead !== values.teamLead) {
    await UpdateMember('teamLead', values);
  }

  if (initialValues.horizontal !== values.horizontal) {
    await UpdateMember('horizontal', values);
  }

  if (initialValues.visible !== values.visible) {
    await UpdateMember('visible', values);
  }

  if (initialValues.left !== values.left) {
    await UpdateMember('left', values);
  }
};

export const compareWithTeamName = (a: any, b: any) => {
  if (!a.teamName && !b.teamName) return 1;
  if (!a.teamName && b.teamName) return 1;
  if (a.teamName && !b.teamName) return -1;
  if (a.teamName < b.teamName) return -1;
  if (a.teamName > b.teamName) return 1;
  return 1;
};

export const handleTeamDuplication = (object: any, index: any) => {
  const currentTeamName = object.directTeamMembers[index].teamName;
  const prevTeamName = object.directTeamMembers[index - 1]?.teamName;
  const teamNameVisible = index === 0 || (index > 0 && currentTeamName !== prevTeamName);
  const hideLine =
    index === 0 ||
    (index > 0 &&
      currentTeamName &&
      currentTeamName.trim() &&
      prevTeamName &&
      prevTeamName.trim() &&
      currentTeamName === prevTeamName);

  return { teamNameVisible, hideLine };
};

export const handleDuplication = (members: any, index: any) => {
  const currentTeamName = members[index].teamName?.trim();
  const prevTeamName = members[index - 1]?.teamName?.trim();
  const teamNameVisible = index === 0 || (index > 0 && currentTeamName !== prevTeamName);
  const hideLine =
    index === 0 ||
    (index > 0 && currentTeamName === prevTeamName && currentTeamName && prevTeamName);

  return { teamNameVisible, hideLine };
};
