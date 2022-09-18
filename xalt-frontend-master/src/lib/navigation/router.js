/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import Login from 'containers/login';
import Landing from 'containers/landing';
import Member from 'containers/member';
import Corp from 'containers/corp';
import ConditioningPage from 'containers/conditioning';
import Challenges from 'containers/challenges';
import Trainer from 'containers/trainer';
import TermsAndConditions from 'containers/terms-and-conditions';
import ContactUs from 'containers/contact-us';
import Pricing from 'containers/pricing';
import PrivacyPolicy from 'containers/privacy-policy';
import AboutUs from 'containers/about-us';
import PillarPage from 'containers/pillar-page';
import RestorePasswordStep1 from 'containers/restore-password/step1';
import RestorePasswordStep2 from 'containers/restore-password/step2';
import ResetPasswordSuccess from 'containers/restore-password/reset-password-success';
import RestorePasswordSuccess from 'containers/restore-password/restore-password-success';
import Registration from 'containers/registration';
import EmailVerificationSent from 'containers/registration/email-verification-sent';
import adminRoutes from 'lib/navigation/routes/admin';
import coachRoutes from 'lib/navigation/routes/coach';
import memberRoutes from 'lib/navigation/routes/member';
import Onboarding from 'containers/roles/member/Onboarding/_step1';
import Onboarding2 from 'containers/roles/member/Onboarding/_step2';
import Onboarding3 from 'containers/roles/member/Onboarding/_step3';
import Onboarding4 from 'containers/roles/member/Onboarding/_step4';
import Onboarding5 from 'containers/roles/member/Onboarding/_step5';
import Onboarding6 from 'containers/roles/member/Onboarding/_step6';
import Onboarding7 from 'containers/roles/member/Onboarding/_step7';
import Onboarding8 from 'containers/roles/member/Onboarding/_step8';
import Onboarding9 from 'containers/roles/member/Onboarding/_step9';
import Onboarding10 from 'containers/roles/member/Onboarding/_step10';
import Onboarding11 from 'containers/roles/member/Onboarding/_step11';
import Onboarding12 from 'containers/roles/member/Onboarding/_step12';
import Onboarding13 from 'containers/roles/member/Onboarding/_step13';
import CoachProfile from 'containers/roles/member/CoachProfile';
import MemberProfile from 'containers/roles/coach/MemberProfile';
import CoachOnboarding from 'containers/roles/coach/Onboarding/_step1';
import CoachOnboarding2 from 'containers/roles/coach/Onboarding/_step2';
import CoachOnboarding3 from 'containers/roles/coach/Onboarding/_step3';
import CoachOnboarding4 from 'containers/roles/coach/Onboarding/_step4';
import CoachOnboarding5 from 'containers/roles/coach/Onboarding/_step5';
import CoachOnboarding6 from 'containers/roles/coach/Onboarding/_step6';
import CoachOnboarding7 from 'containers/roles/coach/Onboarding/_step7';
import CoachOnboarding8 from 'containers/roles/coach/Onboarding/_step8';
import CoachOnboarding9 from 'containers/roles/coach/Onboarding/_step9';
import CoachOnboarding10 from 'containers/roles/coach/Onboarding/step10';

import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { store } from '../../index';

import MainContentBox from './styles';
import PrivateRoute from './privateRoute';
import CompetitionPage from '../../containers/competition';
import TrainersShowcasePage from '../../containers/trainers-showcase';
import Exercise from '../../components/shared/Exercise';

const getRoleFromUlr = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('role') ? urlParams.get('role') : null;
};

const switchRoutes = () => {
  const { role } = store.getState().profile;
  switch (role) {
    case 'admin':
      return adminRoutes;
    case 'coach':
      return coachRoutes;
    case 'member':
      return memberRoutes;
    default:
      return null;
  }
};

const publicMemberPaths = [
  '/',
  '/login',
  '/registration',
  '/competition',
  '/trainers-showcase',
  '/email-verification-sent',
  '/restore-password/step-1',
  '/restore-password/reset-password-success',
  '/restore-password/restore-password-success',
  '/restore-password/step-2',
  '/member-onboarding',
  '/member-onboarding-2',
  '/member-onboarding-3',
  '/member-onboarding-4',
  '/member-onboarding-5',
  '/member-onboarding-6',
  '/member-onboarding-7',
  '/member-onboarding-8',
  '/member-onboarding-9',
  '/member-onboarding-10',
  '/member-onboarding-11',
  '/member-onboarding-12',
  '/member-onboarding-13',
  '/member',
  '/trainer',
  '/terms-and-conditions',
  '/privacy-policy',
  '/contact-us',
  '/corp',
  '/challenges',
  '/about-us',
  '/pricing',
  '/pillar-page',
  '/conditioning',
];

const publicCoachPaths = [
  '/',
  '/login',
  '/registration',
  '/competition',
  '/trainers-showcase',
  '/email-verification-sent',
  '/restore-password/step-1',
  '/restore-password/reset-password-success',
  '/restore-password/restore-password-success',
  '/restore-password/step-2',
  '/coach-onboarding',
  '/coach-onboarding-2',
  '/coach-onboarding-3',
  '/coach-onboarding-4',
  '/coach-onboarding-5',
  '/coach-onboarding-6',
  '/coach-onboarding-7',
  '/coach-onboarding-8',
  '/coach-onboarding-9',
  '/coach-onboarding-10',
  '/member',
  '/trainer',
  '/terms-and-conditions',
  '/privacy-policy',
  '/contact-us',
  '/corp',
  '/challenges',
  '/about-us',
  '/pricing',
  '/pillar-page',
  '/conditioning',
];

const drawRoutes = (routes, isSubscribed) =>
  routes.map(({ path, component, requireSubscription }, key) =>
    requireSubscription ? (
      isSubscribed ? (
        <Route key={key} path={path}>
          <MainContentBox>{component}</MainContentBox>
        </Route>
      ) : (
        <Route key={key} path={path}>
          <Redirect to="/" />
        </Route>
      )
    ) : (
      <Route key={key} path={path}>
        <MainContentBox>{component}</MainContentBox>
      </Route>
    ),
  );

const Router = (props) => {
  const {
    accessToken,
    accessClient,
    accessUID,
    is_onboarding_finished,
    role,
    member_profile,
    isSubscribed,
  } = props;

  const history = useHistory();

  useEffect(() => {
    const publicPaths = role === 'member' ? publicMemberPaths : publicCoachPaths;

    const onboardingPath = role === 'member' ? '/member-onboarding' : '/coach-onboarding';

    if (!(accessToken && accessClient && accessUID)) {
      if (!publicPaths.includes(window.location.pathname)) {
        history.push('/');
      }
    } else if (
      !is_onboarding_finished &&
      !window.location.pathname.includes(onboardingPath) &&
      role
    ) {
      history.push(onboardingPath);
    } else if (publicPaths.includes(window.location.pathname) && is_onboarding_finished) {
      if (!member_profile?.coach_profile_id && role === 'member' && isSubscribed) {
        history.push('/coach-list');
      } else {
        history.push('/dashboard');
      }
    }
  });

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/member" component={Member} />
      <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/corp" component={Corp} />
      <Route exact path="/conditioning" component={ConditioningPage} />
      <Route exact path="/challenges" component={Challenges} />

      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/pricing" component={Pricing} />
      <Route exact path="/pillar-page" component={PillarPage} />
      <Route exact path="/trainer" component={Trainer} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/competition" component={CompetitionPage} />
      <Route path="/trainers-showcase" component={TrainersShowcasePage} />
      <Route path="/email-verification-sent" component={EmailVerificationSent} />
      <Route path="/restore-password/step-1" component={RestorePasswordStep1} />
      <Route path="/restore-password/step-2" component={RestorePasswordStep2} />
      <Route path="/restore-password/reset-password-success" component={ResetPasswordSuccess} />
      <Route path="/restore-password/restore-password-success" component={RestorePasswordSuccess} />
      <PrivateRoute path="/member-onboarding" component={Onboarding} />
      <PrivateRoute path="/member-onboarding-2" component={Onboarding2} />
      <PrivateRoute path="/member-onboarding-3" component={Onboarding3} />
      <PrivateRoute path="/member-onboarding-4" component={Onboarding4} />
      <PrivateRoute path="/member-onboarding-5" component={Onboarding5} />
      <PrivateRoute path="/member-onboarding-6" component={Onboarding6} />
      <PrivateRoute path="/member-onboarding-7" component={Onboarding7} />
      <PrivateRoute path="/member-onboarding-8" component={Onboarding8} />
      <PrivateRoute path="/member-onboarding-9" component={Onboarding9} />
      <PrivateRoute path="/member-onboarding-10" component={Onboarding10} />
      <PrivateRoute path="/member-onboarding-11" component={Onboarding11} />
      <PrivateRoute path="/member-onboarding-12" component={Onboarding12} />
      <PrivateRoute path="/member-onboarding-13" component={Onboarding13} />
      <PrivateRoute path="/coach-profile/:id" component={CoachProfile} />
      <PrivateRoute path="/member-profile/:id" component={MemberProfile} />
      <PrivateRoute path="/coach-onboarding" component={CoachOnboarding} />
      <PrivateRoute path="/coach-onboarding-2" component={CoachOnboarding2} />
      <PrivateRoute path="/coach-onboarding-3" component={CoachOnboarding3} />
      <PrivateRoute path="/coach-onboarding-4" component={CoachOnboarding4} />
      <PrivateRoute path="/coach-onboarding-5" component={CoachOnboarding5} />
      <PrivateRoute path="/coach-onboarding-6" component={CoachOnboarding6} />
      <PrivateRoute path="/coach-onboarding-7" component={CoachOnboarding7} />
      <PrivateRoute path="/coach-onboarding-8" component={CoachOnboarding8} />
      <PrivateRoute path="/coach-onboarding-9" component={CoachOnboarding9} />
      <PrivateRoute path="/coach-onboarding-10" component={CoachOnboarding10} />

      {role && accessToken && accessClient && accessUID
        ? drawRoutes(switchRoutes(), isSubscribed)
        : null}
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  accessClient: state.auth.accessClient,
  accessUID: state.auth.accessUID,
  is_onboarding_finished: state.auth.is_onboarding_finished,
  role: state.profile.role,
  member_profile: state.profile.member_profile,
  isSubscribed:
    true ||
    (state.profile.role === 'member' &&
      ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
        (state.profile.stripe && state.profile.stripe.stripe_subscription_status === 'active'))) ||
    (state.profile.role === 'coach' &&
      (state.auth.stripe || state.profile.stripe) &&
      ((state.auth.stripe && state.auth.stripe.stripe_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_id) ||
        (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
        (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
});

export default withRouter(connect(mapStateToProps, null)(Router));
