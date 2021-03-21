import { useState, useEffect } from 'react';
import { List } from 'immutable';
// import { characters } from '@/data';
import { history } from 'umi';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
const defaultCharacters = [
  {
    id: `${Date.now()}${getRandomInt(10000)}`,
    name: '燕明蓉',

    equipments: [
      {
        pos: 'head',
      },
      {
        pos: 'body',
      },
      {
        pos: 'waist',
      },
      {
        pos: 'wrist',
      },
    ],
    soulStones: [
      {
        id: 1,
        type: '荒',
      },
      {
        id: 2,
        type: '天',
      },
      {
        id: 3,
        type: '地',
      },
    ],
  },
  {
    id: `${Date.now()}${getRandomInt(10000)}`,
    name: '人物2',
    equipments: [
      {
        pos: 'head',
      },
      {
        pos: 'body',
      },
      {
        pos: 'waist',
      },
      {
        pos: 'wrist',
      },
    ],
  },
];
export default () => {
  const [myCharacters, setMyCharacters] = useState(() => {
    return localStorage.getItem('myCharacters')
      ? List(JSON.parse(localStorage.getItem('myCharacters') || '[]'))
      : List(defaultCharacters);
  });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // console.log(myCharacters.indexOf(current));
    // // myCharacters.update(myCharacters.indexOf(current))
    // setMyCharacters(characters.splice());
    // setColor(1);
    console.log(history);
    const { location } = history;
    const locationChange = (l: any) => {
      const obj = myCharacters.find((o: any) => {
        return o.id === l.query?.id;
      });
      console.log(myCharacters.indexOf(obj), obj);
      if (obj) {
        setCurrent(myCharacters.indexOf(obj) as number);
      } else {
        setCurrent(0);
      }
    };
    history.listen(locationChange);
    locationChange(location);
  }, []);
  console.log(myCharacters.get(current));
  return {
    myCharacters: myCharacters.toJS(),
    current: myCharacters.get(current),
    saveCurrent: (v: any) => {
      const newData = myCharacters.set(current, v);
      setMyCharacters(newData);
      localStorage.setItem('myCharacters', JSON.stringify(newData.toJS()));
    },
    // setCurrent: (v: number) => {
    //   const obj = myCharacters.find((o: any) => {
    //     return o.id === v;
    //   });
    //   setCurrent(myCharacters.indexOf(obj) as number);
    // },
  };
};
