import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import notificationsTypes from 'lib/redux/types/notifications';

const { TOGGLE_NOTIFICATIONS_PANEL } = notificationsTypes;

function useLink() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (url) => {
    dispatch({ type: TOGGLE_NOTIFICATIONS_PANEL });
    history.push(url);
  };
}

export default useLink;
