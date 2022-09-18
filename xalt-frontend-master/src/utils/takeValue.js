import { EXERCISE_OPTIONS } from 'lib/constants';

export default (category, value) => EXERCISE_OPTIONS[category].find(item => 
  item.value === value)?.label || '-';