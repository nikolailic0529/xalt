import React from 'react';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { Tooltip } from '@material-ui/core';

export const GenralHealthHistoryQuestions = [
  {
    id: 0,
    type: 'input',
    question: 'How old are you?',
    isShowingNotSure: false,
    isGoalRequired: false,
    isActionRequired: false,
    inputType: 'number',
  },
  {
    id: 1,
    type: 'select',
    question: 'Which sex do you most identify as?',
    isGoalRequired: false,
    isActionRequired: false,
    options: [
      {
        name: 'Female',
        value: 'female',
      },
      {
        name: 'Male',
        value: 'male',
      },
    ],
  },
  {
    id: 2,
    type: 'input',
    question:
      'What is your waist circumferences, in centimeters? How to Measure: Align a measuring tape horizontally between your lowest rib and the top of your hip bone (this is roughly around the belly button for most)',
    isShowingNotSure: true,
    isGoalRequired: true,
    inputType: 'number',
    goalHelperText:
      'Women < 80 cm; Men < 94 cm. Current recommended WC thresholds for abdominal obesity (high and very high risk for cardiovascular disease and diabetes) are set at 80 cm and 88 cm in Caucasian women and 94 cm and 102 cm in Caucasian men.',
  },
  {
    id: 3,
    type: 'input',
    question: 'What is your current weight, in pounds? What is your goal weight?',
    isGoalRequired: true,
    inputType: 'number',
    unit: 'lbs',
  },
  {
    id: 4,
    type: 'input',
    question: 'What is your height, in centimetres?',
    isGoalRequired: false,
    isShowingNotSure: true,
    inputType: 'number',
    unit: 'cm',
  },
  {
    id: 5,
    type: 'input',
    question: (
      <div>
        What is your body fat percentage? Click{' '}
        <a
          style={{ color: 'blue' }}
          href="https://www.calculator.net/body-fat-calculator.html?ctype=metric&csex=m&cage=27&cweightlbs=122&cheightfeet=5&cheightinch=4&cneckfeet=0&cneckinch=12&cwaistfeet=0&cwaistinch=28&chipfeet=0&chipinch=37&cweightkgs=65&cheightmeter=174&cneckmeter=50&cwaistmeter=96&chipmeter=92&x=83&y=9"
          target="_blank"
        >
          here
        </a>{' '}
        to calculate.
        <Tooltip title="Using US Navy Measurements to determine (reliable within 3%)">
          <InfoIcon style={{ fontSize: 16 }} />
        </Tooltip>
      </div>
    ),
    isGoalRequired: true,
    isShowingNotSure: true,
    inputType: 'number',
    goalHelperText: <img src="assets/images/fat-goal.png" alt="" style={{ maxWidth: '400px' }} />,
  },
  {
    id: 6,
    type: 'select',
    question: 'When was the last time you visited your family physician?',
    isGoalRequired: false,
    options: [
      {
        name: 'Within the last 3-6 months',
        value: '3-6 months',
      },
      {
        name: 'Over a year ago',
        value: '1 year',
      },
      {
        name: 'Over 2 years ago',
        value: '2 years',
      },
      {
        name: 'Within the last year',
        value: 'last year',
      },
    ],
  },
  {
    id: 7,
    type: 'input',
    question:
      'What is your current resting heart rate? What is your goal resting heart rate? To calculate this, find your pulse on the side of your neck and count how many beats you feel in 10 seconds. Multiple this number by 6 to find your RHR. For example, if you felt 12 beats, your RHR is 72 (12x6).',
    isGoalRequired: true,
    isShowingNotSure: true,
    goalHelperText:
      'Target range (60-100). Those with >76 bpm at 26% increased risk for heart attack vs <62',
  },
  {
    id: 8,
    type: 'input',
    question: 'Have you had, or do you have, any injuries?',
    isGoalRequired: false,
    inputType: 'text',
  },
  {
    id: 9,
    type: 'input',
    question: 'Have you had any previous surgeries?',
    isGoalRequired: false,
    inputType: 'text',
  },
  {
    id: 10,
    type: 'select',
    question: 'Do you currently drink alcohol? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Stopped within the past 2 years',
        value: 'stopped',
      },
      {
        name: 'Occasionally',
        value: 'occasionally',
      },
      {
        name: 'Regularly',
        value: 'regularly',
      },
    ],
  },
  {
    id: 11,
    type: 'select',
    question: 'Do you currently smoke cigarettes? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Quit within the past 2 years',
        value: 'stopped',
      },
      {
        name: 'Occasionally',
        value: 'occasionally',
      },
      {
        name: 'Regularly',
        value: 'regularly',
      },
    ],
  },
  {
    id: 12,
    type: 'select',
    question: 'Do you currently smoke marijuanna? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Quit within the past 2 years',
        value: 'stopped',
      },
      {
        name: 'Occasionally',
        value: 'occasionally',
      },
      {
        name: 'Regularly',
        value: 'regularly',
      },
    ],
  },
  {
    id: 13,
    type: 'select',
    question: 'Do you currently use any other recreational drugs? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Quit within the past 2 years',
        value: 'stopped',
      },
      {
        name: 'Occasionally',
        value: 'occasionally',
      },
      {
        name: 'Regularly',
        value: 'regularly',
      },
    ],
  },
  {
    id: 14,
    type: 'multiple',
    question: 'Have you ever been diagnosed with any of the following conditions?',
    isGoalRequired: false,
    options: [
      {
        name: 'Hypertension (high blood pressure)',
        value: 'hypertension',
      },
      {
        name: 'Coronary Artery Disease or Angina',
        value: 'coronary',
      },
      {
        name: 'Congestive Heart Failure',
        value: 'congestive',
      },
      {
        name: 'Myocardial Infarction (heart attack)',
        value: 'myocardial',
      },
      {
        name: 'Stroke, or paralysis of one side of your body',
        value: 'stroke',
      },
      {
        name: 'Emphysema or Chronic Bronchitis (COPD)',
        value: 'emphysema',
      },
      {
        name: 'Diabetes',
        value: 'diabetes',
      },
      {
        name: 'Weak or failing kidneys (not including kidney stones, bladder infection or incontinence)',
        value: 'weak',
      },
      {
        name: 'Cancer or malignancy of any kind',
        value: 'cancer',
      },
      {
        name: 'Asthma',
        value: 'asthma',
      },
      {
        name: 'None of the above',
        value: 'none',
      },
      {
        name: 'Other:',
        value: 'other',
      },
    ],
  },
  {
    id: 15,
    type: 'input',
    isGoalRequired: false,
    question: 'Are there any medical conditions in your family?',
  },
  {
    id: 16,
    type: 'input',
    isGoalRequired: false,
    question:
      'Do any of your medical concerns involve musculoskeletal pain? If so, what makes your condition worse? Better? (i.e. sitting, standing, walking, sleeping, lifting, bending)',
  },
  {
    id: 17,
    type: 'select',
    question:
      'Rate your current overall health and indicate where you want your health to be in the future:',
    isGoalRequired: true,
    options: [
      {
        name: 'Poor',
        value: 'poor',
      },
      {
        name: 'Fair',
        value: 'fair',
      },
      {
        name: 'Good',
        value: 'good',
      },
      {
        name: 'Excellent',
        value: 'excellent',
      },
    ],
  },
  {
    id: 18,
    type: 'select',
    question: 'Over the past year, your health has:',
    isGoalRequired: false,
    options: [
      {
        name: 'Gotten worse',
        value: 'worse',
      },
      {
        name: 'Stayed the same',
        value: 'same',
      },
      {
        name: 'Improved somewhat',
        value: 'somewhat',
      },
      {
        name: 'Improved drastically',
        value: 'drastically',
      },
    ],
  },
  {
    id: 19,
    type: 'select',
    question:
      'Compared to the general population, how fit and/or healthy do you think you are? How fit and/or healthy do you want to be?',
    isGoalRequired: true,
    options: [
      {
        name: 'MORE fit/healthy than the general population',
        value: 'more',
      },
      {
        name: 'LESS fit/healthy than the general population',
        value: 'less',
      },
      {
        name: 'About the same',
        value: 'same',
      },
      {
        name: 'Never thought about it',
        value: 'never',
      },
    ],
  },
  {
    id: 20,
    type: 'input',
    isGoalRequired: false,
    question: 'What do you do in your spare time/what are your hobbies?',
  },
];

export const FitnessQuestions = [
  {
    id: 21,
    type: 'select',
    question:
      'At work, how many hours per day do you currently spend seated at your desk? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Less than 6 hours',
        value: 'less',
      },
      {
        name: '6 hours',
        value: '6hours',
      },
      {
        name: '8 hours',
        value: '8hours',
      },
      {
        name: 'More than 8 hours',
        value: 'more',
      },
    ],
  },
  {
    id: 22,
    type: 'select',
    question: 'Currently, how frequently do you exercise? How frequently do you want to exercise?',
    isGoalRequired: true,
    options: [
      {
        name: 'Less than once a week',
        value: 'less',
      },
      {
        name: 'Once a week',
        value: 'once',
      },
      {
        name: 'Two to three times per week',
        value: 'two',
      },
      {
        name: 'Almost every day',
        value: 'almost',
      },
    ],
  },
  {
    id: 23,
    type: 'select',
    question:
      'How long does each current sessions of your daily exercise last? How long do you want it to last?',
    isGoalRequired: true,
    options: [
      {
        name: '<15 minutes',
        value: '15min',
      },
      {
        name: '16-30 minutes',
        value: '30min',
      },
      {
        name: '31-60 minutes',
        value: '60min',
      },
      {
        name: '>60 minutes',
        value: 'over',
      },
    ],
  },
  {
    id: 24,
    type: 'select',
    question:
      'When you currently exercise, how hard do you push yourself? What is your goal? Mark only one oval.',
    isGoalRequired: true,
    options: [
      {
        name: 'Take it easy',
        value: 'take',
      },
      {
        name: 'Heavy breathing and sweating',
        value: 'heavy',
      },
      {
        name: 'Push near exhaustion',
        value: 'push',
      },
    ],
  },
  {
    id: 25,
    type: 'multiple',
    question: 'During the past 30 days, which physical activities have you engaged in?',
    isGoalRequired: false,
    options: [
      {
        name: 'Walking',
        value: 'walking',
      },
      {
        name: 'Running',
        value: 'running',
      },
      {
        name: 'Cycling',
        value: 'cycling',
      },
      {
        name: 'Weight Training',
        value: 'weight',
      },
      {
        name: 'Fitness Classes',
        value: 'fitness',
      },
      {
        name: 'Recreational Sports',
        value: 'recreational',
      },
      {
        name: 'Competative Sports',
        value: 'competative',
      },
      {
        name: 'None',
        value: 'none',
      },
      {
        name: 'Other:',
        value: 'other',
      },
    ],
  },
  {
    id: 26,
    type: 'input',
    isGoalRequired: false,
    question: 'What type of exercise equipment do you have available to use at home?',
  },
];

export const NutritionQuestions = [
  {
    id: 27,
    type: 'select',
    question:
      "Currently, how many times a week do you eat 3 or more servings of fruits a day (1 serving = an apple, banana, orange, OR 1/2 cup of berries, or any chopped fruits, a slice of cantaloupe, watermelon, pineapple. Canned fruit or fruit juice don't count.)? What is your goal?",
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 28,
    type: 'input',
    isGoalRequired: true,
    question: (
      <div>
        What is your calorie intake? Click{' '}
        <a
          style={{ color: 'blue' }}
          href="https://www.active.com/fitness/calculators/calories"
          target="_blank"
        >
          here
        </a>{' '}
        to calculate.
        <Tooltip title="The strongest evidence to date shows that calories matter, but focusing on food quality is an equally important part of preventing weight gain and promoting weight loss. Speak with your healthcare provider or coach for individualized recommendations.">
          <InfoIcon style={{ fontSize: 16 }} />
        </Tooltip>
      </div>
    ),
  },
  {
    id: 29,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 5 or more servings of vegetables a day (1 serving = 1 whole potato (French Fries don’t count!), sweet potato, carrot, pepper, OR 1 cup of broccoli, cauliflower, leafy greens, other vegetables)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 30,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 3 servings of whole grains per day (1 serving = 1 slice of 100% whole grain bread, 1/2 cup of cooked brown, red, black, wild rice, buckwheat, barley, quinoa, or 1 cup of cold cereal grains such as oats)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 31,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 3 or more servings of beans/ lentils a day (1 serving = 1/2 cup - the size of a lightbulb of any bean including: black bean, chickpeas, lentils)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 32,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 1 or more servings of nuts a day (1 serving = 2 oz, a handful of any nuts, including peanuts)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 33,
    type: 'select',
    question:
      'Currently, how many times a week do you, eat 1 or more servings of fish a day (1 serving = 4 oz, the size of a deck of playing cards)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 34,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 1 or more servings of meat a day (1 serving = 4 oz, the size of a deck of playing cards)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 35,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 1 or more servings of dairy a day (1 serving = 1 cup of milk, yogurt, or a slice of cheese)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 36,
    type: 'select',
    question:
      'Currently, how many times a week do you eat 1 or more servings of sweets a day (1 serving = 7 grams of added sugar, a mini candy bar, half a cookie or pastry, a small scoop of ice cream, 3 oz or 1/3 cup of fruit juice or pop)? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 37,
    type: 'select',
    question:
      "Currently, how many times a week do you I eat 1 or more servings of salty snacks a day (1 serving = 1 handful of corn chips, potato chips, crackers, pretzels. Nuts don't count)? What is your goal?",
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 38,
    type: 'select',
    question:
      'In the past 7 days, how many meals have you eaten from a fast food chain? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 39,
    type: 'select',
    question:
      'In the past 7 days, how many drinks of alcohol have you consumed? (1 drink = 12oz beer, 4oz wine, 1oz hard liquor) What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 40,
    type: 'select',
    question:
      'How many minutes does it take to walk from your home to the closest store that sells fresh produce?',
    isGoalRequired: false,
    options: [
      {
        name: '5 minutes or less',
        value: '5minutes',
      },
      {
        name: '10-15 minutes',
        value: '15minutes',
      },
      {
        name: '35 + minutes',
        value: '35minutes',
      },
    ],
  },
  {
    id: 41,
    type: 'input',
    isGoalRequired: false,
    question: 'What are 3 HEALTHY foods you eat in a typical week?',
  },
  {
    id: 42,
    type: 'input',
    isGoalRequired: false,
    question: 'What are 3 UNHEALTHY foods you eat in a typical week?',
  },
  {
    id: 43,
    type: 'select',
    question: 'Do you typically skip meals? (i.e. not due to intermittent fasting, etc.)',
    isGoalRequired: false,
    options: [
      {
        name: 'Yes',
        value: 'yes',
      },
      {
        name: 'Sometimes',
        value: 'sometimes',
      },
      {
        name: 'Frequently',
        value: 'frequently',
      },
      {
        name: 'Always',
        value: 'always',
      },
      {
        name: 'Never',
        value: 'never',
      },
    ],
  },
  {
    id: 44,
    type: 'select',
    question: 'Do you follow a certain diet?',
    isGoalRequired: false,
    options: [
      {
        name: 'Vegetarian',
        value: 'vegetarian',
      },
      {
        name: 'Vegan',
        value: 'vegan',
      },
      {
        name: 'Gluten-free',
        value: 'gluten-free',
      },
      {
        name: 'Keto',
        value: 'keto',
      },
      {
        name: 'Paleo',
        value: 'paleo',
      },
      {
        name: 'None',
        value: 'none',
      },
      {
        name: 'Other:',
        value: 'other',
      },
    ],
  },
  {
    id: 45,
    type: 'input',
    isGoalRequired: true,
    question: 'How much water do you currently consume daily? What is your goal?',
  },
];

export const SleepQuestions = [
  {
    id: 46,
    type: 'select',
    question: 'Do you go to bed and get up at the same time every day?',
    isGoalRequired: false,
    options: [
      {
        name: 'Yes',
        value: 'yes',
      },
      {
        name: 'No',
        value: 'no',
      },
      {
        name: 'Other:',
        value: 'other',
      },
    ],
  },
  {
    id: 47,
    type: 'select',
    question:
      'On average, how many hours of sleep do you currently get a night? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: 'Less than 5 hours',
        value: '5hours',
      },
      {
        name: 'Between 5-7 hours',
        value: '7hours',
      },
      {
        name: 'Between 7-9 hours',
        value: '9hours',
      },
      {
        name: 'More than 9 hours',
        value: 'more',
      },
    ],
  },
  {
    id: 48,
    type: 'select',
    question: 'Rate the current quality of your sleep. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: (
          <div>
            1{' '}
            <Tooltip title="Worst">
              <InfoIcon style={{ fontSize: 16 }} />
            </Tooltip>
          </div>
        ),
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: (
          <div>
            8{' '}
            <Tooltip title="Best (falling asleep <10 minutes, with <1 interruption)">
              <InfoIcon style={{ fontSize: 16 }} />
            </Tooltip>
          </div>
        ),
        value: '8',
      },
    ],
  },
  {
    id: 49,
    type: 'select',
    question: 'How long does it currently take you to fall asleep? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '10 minutes or less',
        value: '1',
      },
      {
        name: '11-30 minutes',
        value: '2',
      },
      {
        name: '31-60 minutes',
        value: '3',
      },
      {
        name: '60 minutes or more',
        value: '4',
      },
    ],
  },
  {
    id: 50,
    type: 'select',
    question: 'How often do you wake up, on average, during the night? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1 or less',
        value: '1',
      },
      {
        name: '2-3',
        value: '2',
      },
      {
        name: '4-5',
        value: '3',
      },
      {
        name: '6 or more',
        value: '4',
      },
    ],
  },
  {
    id: 51,
    type: 'select',
    question: 'Upon waking up, how do you feel? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: (
          <div>
            1{' '}
            <Tooltip title="exhausted, groggy, difficult to get out of bed">
              <InfoIcon style={{ fontSize: 16 }} />
            </Tooltip>
          </div>
        ),
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: (
          <div>
            8{' '}
            <Tooltip title="Ready to roll, feeling positive and energetic">
              <InfoIcon style={{ fontSize: 16 }} />
            </Tooltip>
          </div>
        ),
        value: '8',
      },
    ],
  },
  {
    id: 52,
    type: 'select',
    question: 'Do you take medications to supplements to help you sleep?',
    isGoalRequired: false,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Sometimes',
        value: 'sometimes',
      },
      {
        name: 'Frequently',
        value: 'frequently',
      },
      {
        name: 'Always',
        value: 'always',
      },
    ],
  },
  {
    id: 53,
    type: 'select',
    question: 'Do you snore?',
    isGoalRequired: false,
    options: [
      {
        name: 'Never',
        value: 'never',
      },
      {
        name: 'Sometimes',
        value: 'sometimes',
      },
      {
        name: 'Frequently',
        value: 'frequently',
      },
      {
        name: 'Always',
        value: 'always',
      },
    ],
  },
];

export const StressQuestions = [
  {
    id: 54,
    type: 'select',
    question:
      'In the past 7 days, how many days have you felt sad or depressed? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 55,
    type: 'input',
    isGoalRequired: false,
    question: 'At this moment, what do you identify as your top three stressors?',
  },
  {
    id: 56,
    type: 'input',
    isGoalRequired: false,
    question:
      'Do you engage in any coping strategies for the above stressors? If yes, what do you do and how often?',
  },
  {
    id: 57,
    type: 'input',
    isGoalRequired: false,
    question: 'Does your work stress differ from home stress? If yes, briefly explain.',
  },
  {
    id: 58,
    type: 'input',
    isGoalRequired: false,
    question: 'What does stress do to your body?',
  },
];

export const CommunityQuestions = [
  {
    id: 59,
    type: 'select',
    question:
      'In the past 7 days, how many times do you socialize with someone you like? What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 60,
    type: 'select',
    question: 'How many people do you feel you can call when you need to talk to someone?',
    isGoalRequired: false,
    options: [
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
    ],
  },
  {
    id: 61,
    type: 'select',
    question: 'Do you prefer to engage in activity alone or with family/friends?',
    isGoalRequired: false,
    options: [
      {
        name: 'Alone',
        value: 'alone',
      },
      {
        name: 'Just family',
        value: 'family',
      },
      {
        name: 'Just friends',
        value: 'friends',
      },
      {
        name: 'Combination of all of the above',
        value: 'combination',
      },
    ],
  },
  {
    id: 62,
    type: 'select',
    question:
      'Are you currently apart of any online or in-person communities (i.e. social groups)?',
    isGoalRequired: false,
    options: [
      {
        name: 'Yes',
        value: 'yes',
      },
      {
        name: 'No',
        value: 'no',
      },
      {
        name: 'Other',
        value: 'other',
      },
    ],
  },
  {
    id: 63,
    type: 'input',
    isGoalRequired: false,
    question: 'What does community mean to you? What does a sense of belonging feel like to you?',
  },
  {
    id: 64,
    type: 'input',
    isGoalRequired: false,
    question:
      'What does your ideal social belonging and community look like (i.e. what would you change to make your current situation better)?',
  },
  {
    id: 65,
    type: 'input',
    isGoalRequired: false,
    question: 'What is the happiest part of your daily routine?',
  },
  {
    id: 66,
    type: 'input',
    isGoalRequired: false,
    question: 'What are some things you feel grateful for?',
  },
  {
    id: 67,
    type: 'input',
    isGoalRequired: false,
    question: 'In the past week/month/year, what were your three most positive moments?',
  },
  {
    id: 68,
    type: 'select',
    question: 'On a scale of 1 to 10, rate your current level of happiness. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 69,
    type: 'input',
    question:
      "What's one thing you could change about yourself/your current situation that would increase your happiness?",
    isGoalRequired: false,
  },
];

export const GoalQuestions = [
  {
    id: 70,
    type: 'input',
    question:
      'What do you hope to get out of these sessions with your coach (i.e. coaching cues, education, awareness, weight loss, etc.)?',
    isGoalRequired: false,
  },
  {
    id: 71,
    type: 'multiple',
    question: 'What type of support are you looking for from your coach? Check all that apply.',
    isGoalRequired: false,
    options: [
      {
        name: 'Wellness',
        value: 'wellness',
      },
      {
        name: 'Support',
        value: 'support',
      },
      {
        name: 'Pain Relief',
        value: 'pain',
      },
      {
        name: 'Other:',
        value: 'other',
      },
    ],
  },
  {
    id: 71,
    type: 'input',
    question:
      'Describe a time you did not successfully achieve a goal? What happened/prevented you from doing so?',
    isGoalRequired: false,
  },
  {
    id: 72,
    type: 'input',
    question: 'What is an activity you cannot do now but wish to be able to do in one year?',
    isGoalRequired: false,
  },
  {
    id: 73,
    type: 'input',
    isGoalRequired: false,
    question:
      'What are your top two most important health goals that you would like to start with your trainer?',
  },
  {
    id: 74,
    type: 'input',
    isGoalRequired: false,
    question: 'Where would you like to see your health at in 5 years?',
  },
  {
    id: 75,
    type: 'input',
    isGoalRequired: false,
    question: 'Where would you like to see your health at in 10 years?',
  },
  {
    id: 76,
    type: 'input',
    isGoalRequired: false,
    question:
      'What are some current barriers that are preventing you from achieving your goals (i.e. lack of time, knowledge, motivation, an injury, etc.)?',
  },
  {
    id: 77,
    type: 'input',
    isGoalRequired: false,
    question: 'How will working towards/achieving these goals improve your everyday life?',
  },
  {
    id: 78,
    type: 'input',
    isGoalRequired: false,
    question:
      'What behaviours or lifestyle habits do you currently engage in regularly that you believe SUPPORTS your health?',
  },
  {
    id: 79,
    type: 'input',
    isGoalRequired: false,
    question:
      'What behaviours or lifestyle habits do you currently engage in regularly that you believe HARMS your health?',
  },
  {
    id: 80,
    type: 'select',
    question: 'On a scale of 1 to 10, rate how important it is for you to achieve your goal(s).',
    isGoalRequired: false,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 81,
    type: 'select',
    question:
      'On a scale of 1 to 10, how capable do you think you are in being able to achieve your individual goal(s)? ',
    isGoalRequired: false,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 82,
    type: 'input',
    question:
      'How would you like to monitor your success (i.e. body measurements, weight load, etc.)?',
    isGoalRequired: false,
  },
];

export const PillarsQuestions = [
  {
    id: 83,
    type: 'select',
    question: 'On a scale of 1 to 10, rate your current quality of sleep. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 84,
    type: 'select',
    question: 'On a scale of 1 to 10, rate your current stress levels. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 85,
    type: 'select',
    question:
      'On a scale of 1 to 10, rate your current physical fitness levels. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 86,
    type: 'select',
    question:
      'On a scale of 1 to 10, rate your current quality of diet/nutrition. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 87,
    type: 'select',
    question: 'On a scale of 1 to 10, rate your current overall happiness. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
  {
    id: 88,
    type: 'select',
    question:
      'On a scale of 1 to 10, rate your current level of community engagement and/or involvement. What is your goal?',
    isGoalRequired: true,
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: '7',
        value: '7',
      },
      {
        name: '8',
        value: '8',
      },
      {
        name: '9',
        value: '9',
      },
      {
        name: '10',
        value: '10',
      },
    ],
  },
];
