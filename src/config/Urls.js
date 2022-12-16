const Urls = {
  //get Member
  getMember: (upn, anonymous) => `OrgChart?upn=${upn}&anonymous=true`,

  //delete Member from the Team
  deleteMember: (upn) => `Member/${upn}`,

  //Add new member to the team
  addMember: (upn, reportsInto, displayName, teamName, teamLead, visible) =>
    `Member?upn=${upn}&reportsIntoUpn=${reportsInto}&displayName=${displayName}&teamName=${teamName}&teamLead=${teamLead}&visible=${visible}`,

  //change the team name
  updateTeamName: (oldTeamName, newteamName) =>
    `Team/${oldTeamName}/Name?newTeamName=${newteamName}`,

  //Move to another team
  updateMember: (upn, leaderUpn) => `Member/${upn}/ReportsIntoUpn?teamLeaderUpn=${leaderUpn}`,

  //edit the horizontal dimension of the team memeber
  updateHorizontalDimension: (upn, horizontal) =>
    `Member/${upn}/Dimensions/Horizontal?horizontal=${horizontal}`,

  //edit the left dimension of the team memeber
  updateLeftDimension: (upn, left) => `Member/${upn}/Dimensions/Left?left=${left}`,

  //make team member team lead
  updateTeamLeaderStatus: (upn, teamLeader) => `Member/${upn}/TeamLead?teamLeader=${teamLeader}`,

  //change display name
  updateDisplayName: (upn, displayName) => `Member/${upn}/DisplayName?displayName=${displayName}`,

  //change visibility status
  updateVisible: (upn, visible) => `Member/${upn}/Visible?visible=${visible}`,

  //Move the employee into another team
  updatePartofTeam: (upn, team) => `Member/${upn}/AsPartOfTeam?team=${team}`,

  login: 'manage-user',
};

export default Urls;
