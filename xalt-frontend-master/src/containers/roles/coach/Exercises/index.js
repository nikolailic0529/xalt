import React from 'react';
import TabPanel from 'components/shared/TabPanel';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import ExercisesActions from 'lib/redux/reducers/exercises';

import { PlusCircleOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import colors from 'lib/theme/colors';
import qs from 'qs';
import ExercisesList from './ExercisesList';

const ExercisesTabs = ({
  getAllExercisesRequest,
  getMyExercisesRequest,
  profile,
  isSubscribed,
}) => {
  const history = useHistory();

  return (
    
    <TabPanel
      selected={qs.parse(window.location.search.replace(/^\?/, '')).scope}
      tabs={[
        {
          id: 'all',
          title: 'xalt exercise database',
          component: <ExercisesList />,
          onClick: () => {
            getAllExercisesRequest({});

            history.push({ search: '?scope=all' });
          },
        },
        {
          id: 'my',
          title: 'my exercises',
          component: <ExercisesList my />,
          onClick: () => {
            getMyExercisesRequest({ coach_id: profile.id });

            history.push({ search: '?scope=my' });
          },
        },
        {
          id: 'competition',
          title: 'xAlt exercise competition',
          component: <ExercisesList competition />,
          onClick: () => {
            getAllExercisesRequest({ is_competition: true });

            history.push({ search: '?scope=competition' });
          },
        },
      ]}
      actions={[
        {
          component: isSubscribed ? (
            <Link to="/exercises/new">
              <Flex alignItems="center">
                <PlusCircleOutlined
                  style={{ color: colors.darkPink, marginRight: '10px', fontSize: '24px' }}
                />
                <Text darkPink>Add New Exercise</Text>
              </Flex>
            </Link>
          ) : null,
        },
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
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

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMyExercisesRequest: (filters) => dispatch(ExercisesActions.getMyExercisesRequest(filters)),
  getAllExercisesRequest: () => dispatch(ExercisesActions.getAllExercisesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesTabs);
