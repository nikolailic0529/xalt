import colors from 'lib/theme/colors';
import { makeStyles } from '@material-ui/core/styles';

const materialStyles = makeStyles((theme) => ({
  exerciseTitle: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between',
  },
  exerciseTitleText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: "'Roboto', sans-serif",
    fontSize: 18,
    paddingLeft: 0,
    textAlign: 'left',
    whiteSpace: 'pre-line',
    marginBottom: '10px',
  },
  formComponent: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '22.5%',  
  },
  formTextBox: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 18,
  },
  graphInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  graphContainer: {
    marginTop: '10px',
    padding: '15px',
    width: '100%',
    height: '30%',
    border: `1px solid ${colors.darkPink}`,
    borderRadius: '5px',
  },
  measurementInfo: {
    marginTop: '10px',
    marginLeft: '1%',
    padding: '15px',
    width: '29%',
    height: '30%',
  },
  mainContentWrapper: {
    width: '100%',
    height: '100%',
  },
  titleBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  mainForm: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    marginTop: '15px',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}));

export default materialStyles;
