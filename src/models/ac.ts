import { useState, useEffect } from 'react';
import { List } from 'immutable';
import _ from 'lodash';
// import { characters } from '@/data';
import { history } from 'umi';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
const getNewId = () => `${Date.now()}${getRandomInt(10000)}`;
const defaultCharacters: TDJ.Character[] = [
  {
    id: getNewId(),
    name: '燕明蓉',
    attrFinal: {
      hp: 0,
      patk: 0,
      pdef: 0,
      matk: 0,
      mdef: 0,
      critical: 0,
    },
    attrRaw: {
      hp: 0,
      patk: 0,
      pdef: 0,
      matk: 0,
      mdef: 0,
      critical: 0,
    },
    attrFinalFixed: {
      hp: 0,
      patk: 0,
      pdef: 0,
      matk: 0,
      mdef: 0,
      critical: 0,
    },
    weapon: {
      attrBonus: {
        hp: 0,
        patk: 0,
        matk: 0,
      },
      otherBonus: [],
    },
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
    soulStoneSet: [],
    equipped: {
      equipments: [
        {
          type: 'head',
          attrBonus: [],
        },
        {
          type: 'body',
          attrBonus: [],
        },
        {
          type: 'waist',
          attrBonus: [],
        },
        {
          type: 'wrist',
          attrBonus: [],
        },
      ],
      setBonus: [
        {
          types: ['hp'],
        },
        {
          types: ['pdef', 'mdef'],
        },
      ],
    },
    wunei: {
      percentage: {
        types: ['hp', 'matk', 'mdef', 'patk', 'pdef', 'critical'],
        value: 0,
      },
      fixed: [],
    },
    astrolabe: {
      percentage: [
        {
          types: ['pdef'],
          value: 0,
        },
        {
          types: ['mdef'],
          value: 0,
        },
        {
          types: ['patk', 'matk'],
          value: 0,
        },
        {
          types: ['hp'],
          value: 0,
        },
      ],
    },
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
  }, [myCharacters]);

  const addCharacter = () => {
    const newData = _.cloneDeep(defaultCharacters[0]);
    newData.id = getNewId();
    newData.name = `人物${myCharacters.size + 1}`;
    const newList = myCharacters.push(newData);
    setMyCharacters(newList);
    history.push(`/ac?id=${newData.id}`);
    localStorage.setItem('myCharacters', JSON.stringify(newList.toJS()));
  };
  const deleteCharacter = () => {
    if (myCharacters.size <= 1) return;
    const newList = myCharacters.remove(current);
    setMyCharacters(newList);
    history.push(`/ac?id=${(newList.last() as TDJ.Character).id}`);
    localStorage.setItem('myCharacters', JSON.stringify(newList.toJS()));
  };
  return {
    myCharacters: myCharacters.toJS(),
    addCharacter,
    deleteCharacter,
    current: myCharacters.get(current) as TDJ.Character,
    saveCurrent: (v: any) => {
      const newList = myCharacters.set(current, v);
      setMyCharacters(newList);
      localStorage.setItem('myCharacters', JSON.stringify(newList.toJS()));
    },
    // setCurrent: (v: number) => {
    //   const obj = myCharacters.find((o: any) => {
    //     return o.id === v;
    //   });
    //   setCurrent(myCharacters.indexOf(obj) as number);
    // },
  };
};
