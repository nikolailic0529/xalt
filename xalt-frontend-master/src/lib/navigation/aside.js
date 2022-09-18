import React from 'react';

import SvgIcon from 'components/shared/SvgIcon';

export default {
  admin: [],
  coach: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <SvgIcon name="navDashboard" />,
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: <SvgIcon name="navCalendar" />,
      requireSubscription: true,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: <SvgIcon name="navMessages" />,
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: <SvgIcon name="navReports" />,
    },
    {
      title: 'Exercises',
      href: '/exercises',
      icon: <SvgIcon name="navExercices" />,
    },
    {
      title: 'Members',
      href: '/members',
      icon: <SvgIcon name="navMembers" />,
    },
  ],
  member: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <SvgIcon name="navDashboard" />,
    },
    {
      title: 'Calendar',
      href: '/calendar',
      icon: <SvgIcon name="navCalendar" />,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: <SvgIcon name="navMessages" />,
    },
    {
      title: 'Actions',
      href: '/homework',
      icon: <SvgIcon name="navHomework" />,
      requireSubscription: true,
    },
    {
      title: 'Health Profile',
      href: '/question',
      icon: <SvgIcon name="navQuestion" />,
    },
    {
      title: 'Measurements',
      href: '/measurements',
      icon: <SvgIcon name="navMeasurements" />,
    },
    {
      title: 'Challenges',
      href: '/member_challenges',
      icon: <SvgIcon name="ribbon" />,
    },
  ],
};
