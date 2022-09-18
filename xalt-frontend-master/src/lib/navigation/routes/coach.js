import React from 'react';

import Dashboard from 'containers/roles/coach/Dashboard';
import Calendar from 'containers/roles/coach/Calendar';
import Messages from 'containers/roles/coach/Messages';
import Reports from 'containers/roles/coach/Reports';
import ViewReport from 'containers/roles/coach/Reports/View';
import EditReport from 'containers/roles/coach/Reports/Edit';
import Exercises from 'containers/roles/coach/Exercises';
import NewExercise from 'containers/roles/coach/Exercises/new';
import EditExercises from 'containers/roles/coach/Exercises/Edit';
import ViewExercise from 'containers/roles/coach/Exercises/View';
import Members from 'containers/roles/coach/Members';
import Onboarding from 'containers/roles/coach/Onboarding';
import Profile from 'containers/roles/coach/Profile';
import Account from 'containers/roles/coach/Account';
import EditAccount from 'containers/roles/coach/Account/edit';

export default [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/calendar', component: <Calendar />, requireSubscription: true },
  { path: '/messages', component: <Messages /> },
  { path: '/reports/view/:id', component: <ViewReport /> },
  { path: '/reports/edit/:id', component: <EditReport /> },
  { path: '/reports', component: <Reports /> },
  { path: '/exercises/new', component: <NewExercise /> },
  { path: '/exercises/edit/:id', component: <EditExercises /> },
  { path: '/exercises/:id', component: <ViewExercise /> },
  { path: '/exercises', component: <Exercises /> },
  { path: '/members', component: <Members /> },
  { path: '/onboarding', component: <Onboarding /> },
  { path: '/profile', component: <Profile /> },
  { path: '/account/edit', component: <EditAccount /> },
  { path: '/account', component: <Account /> },
];
