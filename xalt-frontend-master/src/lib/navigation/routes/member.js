import React from 'react';
import Dashboard from 'containers/roles/member/Dashboard';
import Calendar from 'containers/roles/member/Calendar';
import Messages from 'containers/roles/member/Messages';
import Homework from 'containers/roles/member/Homework';
import CoachList from 'containers/roles/member/CoachList';
import Account from 'containers/roles/member/Profile/Account';
import ChangeDetails from 'containers/roles/member/Profile/ChangeDetails';
import Questionaires from 'containers/roles/member/Questionaires';
import UpgradePlan from 'containers/roles/member/Profile/UpgradePlan';
import Measurements from 'containers/roles/member/Measurements';
import MemberChallenges from '../../../containers/roles/member/MemberChallenges';
import ViewChallenge from '../../../containers/roles/member/MemberChallenges/View'




export default [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/calendar', component: <Calendar /> },
  { path: '/messages', component: <Messages /> },
  { path: '/upgrade-plan', component: <UpgradePlan /> },
  { path: '/homework', component: <Homework />, requireSubscription: true },
  { path: '/question', component: <Questionaires /> },
  { path: '/measurements', component: <Measurements /> },
  { path: '/coach-list', component: <CoachList />, requireSubscription: true },
  { path: '/account', component: <Account /> },
  { path: '/change-details', component: <ChangeDetails /> },
  { path: '/member_challenges/:id', component: <ViewChallenge /> },
  { path: '/member_challenges', component: <MemberChallenges /> },
];
