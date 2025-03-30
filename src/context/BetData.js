// The provided code defines an object named `Betdata` that contains information about betting options for a sports event. It includes two main properties: `tWin` and `t1Overs`.

// 1. `tWin`: It is an array of objects representing the winning options. Each object has the following properties:
//    - `id`: Unique identifier for the option.
//    - `betType`: Description of the bet type.
//    - `odds`: Odds associated with the bet type.

// 2. `t1Overs`: It is an array of objects representing specific overs for a team. Each object has the following properties:
//    - `name`: Name of the over.
//    - `options`: An array of objects representing betting options for that over. Each option object has the following properties:
//      - `id`: Unique identifier for the option.
//      - `betType`: Description of the bet type.
//      - `odds`: Odds associated with the bet type.

const BetData = {
  // tWin is an array of objects representing the winning options.
  tWin: [
    {
      id: 0.1,
      betType: 'T1 - Wins',
      odds: 1.5,
    },
    {
      id: 0.2,
      betType: 'T2 - Wins',
      odds: 2.5,
    },
  ],

  // t1Overs is now an array of objects, where each object represents a specific Over
  t1Overs: [
    {
      name: 'Over1',
      options: [
        {
          id: 1.1,
          betType: '1 - Over, Over 4.5',
          odds: 1.45,
        },
        {
          id: 1.2,
          betType: '1 - Over, Under 4.5',
          odds: 2.63,
        },
        {
          id: 1.3,
          betType: '1 - Over, Over 5.5',
          odds: 1.7,
        },
        {
          id: 1.4,
          betType: '1 - Over, Under 5.5',
          odds: 2.06,
        },
        {
          id: 1.5,
          betType: '1 - Over, Over 6.5',
          odds: 1.91,
        },
        {
          id: 1.6,
          betType: '1 - Over, Under 6.5',
          odds: 1.8,
        },
      ],
    },
    {
      name: 'Over2',
      options: [
        {
          id: 2.1,
          betType: '2 - Over, Over 6.5',
          odds: 1.5,
        },
        {
          id: 2.2,
          betType: '2 - Over, Under 6.5',
          odds: 2.5,
        },
        {
          id: 2.3,
          betType: '2 - Over, Over 7.5',
          odds: 1.8,
        },
        {
          id: 2.4,
          betType: '2 - Over, Under 7.5',
          odds: 1.92,
        },
        {
          id: 2.5,
          betType: '2 - Over, Over 8.5',
          odds: 2.04,
        },
        {
          id: 2.6,
          betType: '2 - Over, Under 8.5',
          odds: 1.72,
        },
      ],
    },
    {
      name: 'Over3',
      options: [
        {
          id: 3.1,
          betType: '3 - Over, Over 7.5',
          odds: 1.57,
        },
        {
          id: 3.2,
          betType: '3 - Over, Under 7.5',
          odds: 2.25,
        },
        {
          id: 3.3,
          betType: '3 - Over, Over 8.5',
          odds: 1.86,
        },
        {
          id: 3.4,
          betType: '3 - Over, Under 8.5',
          odds: 1.86,
        },
        {
          id: 3.5,
          betType: '3 - Over, Over 9.5',
          odds: 2.04,
        },
        {
          id: 3.6,
          betType: '3 - Over, Under 9.5',
          odds: 1.71,
        },
      ],
    },
    {
      name: 'Over4',
      options: [
        {
          id: 4.1,
          betType: '4 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 4.2,
          betType: '4 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 4.3,
          betType: '4 - Over, Over 8.5',
          odds: 1.86,
        },
        {
          id: 4.4,
          betType: '4 - Over, Under 8.5',
          odds: 1.86,
        },
        {
          id: 4.5,
          betType: '4 - Over, Over 9.5',
          odds: 2.04,
        },
        {
          id: 4.6,
          betType: '4 - Over, Under 9.5',
          odds: 1.71,
        },
      ],
    },
    {
      name: 'Over5',
      options: [
        {
          id: 5.1,
          betType: '5 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 5.2,
          betType: '5 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 5.3,
          betType: '5 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 5.4,
          betType: '5 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 5.5,
          betType: '5 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 5.6,
          betType: '5 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over6',
      options: [
        {
          id: 6.1,
          betType: '6 - Over, Over 7.5',
          odds: 1.5,
        },
        {
          id: 6.2,
          betType: '6 - Over, Under 7.5',
          odds: 2.5,
        },
        {
          id: 6.3,
          betType: '6 - Over, Over 8.5',
          odds: 1.8,
        },
        {
          id: 6.4,
          betType: '6 - Over, Under 8.5',
          odds: 1.94,
        },
        {
          id: 6.5,
          betType: '6 - Over, Over 9.5',
          odds: 1.73,
        },
        {
          id: 6.6,
          betType: '6 - Over, Under 9.5',
          odds: 1.75,
        },
      ],
    },
    {
      name: 'Over7',
      options: [
        {
          id: 7.1,
          betType: '7 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 7.2,
          betType: '7 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 7.3,
          betType: '7 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 7.4,
          betType: '7 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 7.5,
          betType: '7 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 7.6,
          betType: '7 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over8',
      options: [
        {
          id: 8.1,
          betType: '8 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 8.2,
          betType: '8 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 8.3,
          betType: '8 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 8.4,
          betType: '8 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 8.5,
          betType: '8 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 8.6,
          betType: '8 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over9',
      options: [
        {
          id: 9.1,
          betType: '9 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 9.2,
          betType: '9 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 9.3,
          betType: '9 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 9.4,
          betType: '9 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 9.5,
          betType: '9 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 9.6,
          betType: '9 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over10',
      options: [
        {
          id: 10.1,
          betType: '10 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 10.2,
          betType: '10 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 10.3,
          betType: '10 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 10.4,
          betType: '10 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 10.5,
          betType: '10 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 10.6,
          betType: '10 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over11',
      options: [
        {
          id: 11.1,
          betType: '11 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 11.2,
          betType: '11 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 11.3,
          betType: '11 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 11.4,
          betType: '11 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 11.5,
          betType: '11 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 11.6,
          betType: '11 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over12',
      options: [
        {
          id: 12.1,
          betType: '12 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 12.2,
          betType: '12 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 12.3,
          betType: '12 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 12.4,
          betType: '12 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 12.5,
          betType: '12 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 12.6,
          betType: '12 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over13',
      options: [
        {
          id: 13.1,
          betType: '13 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 13.2,
          betType: '13 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 13.3,
          betType: '13 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 13.4,
          betType: '13 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 13.5,
          betType: '13 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 13.6,
          betType: '13 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over14',
      options: [
        {
          id: 14.1,
          betType: '14 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 14.2,
          betType: '14 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 14.3,
          betType: '14 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 14.4,
          betType: '14 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 14.5,
          betType: '14 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 14.6,
          betType: '14 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over15',
      options: [
        {
          id: 15.1,
          betType: '4 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 15.2,
          betType: '14 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 15.3,
          betType: '15 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 15.4,
          betType: '15 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 15.5,
          betType: '15 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 15.6,
          betType: '15 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over16',
      options: [
        {
          id: 16.1,
          betType: '16 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 16.2,
          betType: '16 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 16.3,
          betType: '16 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 16.4,
          betType: '16 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 16.5,
          betType: '16 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 16.6,
          betType: '16 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over17',
      options: [
        {
          id: 17.1,
          betType: '17 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 17.2,
          betType: '17 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 17.3,
          betType: '17 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 17.4,
          betType: '17 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 17.5,
          betType: '17 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 17.6,
          betType: '17 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over18',
      options: [
        {
          id: 18.1,
          betType: '18 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 18.2,
          betType: '18 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 18.3,
          betType: '18 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 18.4,
          betType: '18 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 18.5,
          betType: '18 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 18.6,
          betType: '18 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over19',
      options: [
        {
          id: 19.1,
          betType: '19 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 19.2,
          betType: '19 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 19.3,
          betType: '19 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 19.4,
          betType: '19 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 19.5,
          betType: '19 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 19.6,
          betType: '19 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
    {
      name: 'Over20',
      options: [
        {
          id: 20.1,
          betType: '20 - Over, Over 7.5',
          odds: 1.53,
        },
        {
          id: 20.2,
          betType: '20 - Over, Under 7.5',
          odds: 2.38,
        },
        {
          id: 20.3,
          betType: '20 - Over, Over 8.5',
          odds: 1.82,
        },
        {
          id: 20.4,
          betType: '20 - Over, Under 8.5',
          odds: 1.91,
        },
        {
          id: 20.5,
          betType: '20 - Over, Over 9.5',
          odds: 2.02,
        },
        {
          id: 20.6,
          betType: '20 - Over, Under 9.5',
          odds: 1.73,
        },
      ],
    },
  ],
};

export default BetData;
