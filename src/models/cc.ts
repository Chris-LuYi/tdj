import { useState, useEffect } from 'react';
import { List } from 'immutable';
import _ from 'lodash';
// import { characters } from '@/data';
import { history } from 'umi';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
const getNewId = () => `${Date.now()}${getRandomInt(10000)}`;
const defaultCombats: TDJ.Combat[] = [
  {
    id: getNewId(),
    name: '默认场景',
    attackerId: '111',
    defenderId: '2222',
  },
];

export default () => {
  const [myCombats, setMyCombats] = useState(() => {
    return localStorage.getItem('myCombats')
      ? List(JSON.parse(localStorage.getItem('myCombats') || '[]'))
      : List(defaultCombats);
  });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // console.log(myCombats.indexOf(current));
    // // myCombats.update(myCombats.indexOf(current))
    // setMyCombats(characters.splice());
    // setColor(1);
    console.log(history);
    const { location } = history;
    const locationChange = (l: any) => {
      const obj = myCombats.find((o: any) => {
        return o.id === l.query?.id;
      });
      console.log(myCombats.indexOf(obj), obj);
      if (obj) {
        setCurrent(myCombats.indexOf(obj) as number);
      } else {
        setCurrent(0);
      }
    };
    history.listen(locationChange);
    locationChange(location);
  }, [myCombats]);

  const addCombat = () => {
    const newData = _.cloneDeep(defaultCombats[0]);
    newData.id = getNewId();
    newData.name = `战斗${myCombats.size + 1}`;
    const newList = myCombats.push(newData);
    setMyCombats(newList);
    history.push(`/dc?id=${newData.id}`);
    localStorage.setItem('myCombats', JSON.stringify(newList.toJS()));
  };
  const deleteCombat = () => {
    if (myCombats.size <= 1) return;
    const newList = myCombats.remove(current);
    setMyCombats(newList);
    history.push(`/dc?id=${(newList.last() as TDJ.Combat).id}`);
    localStorage.setItem('myCombats', JSON.stringify(newList.toJS()));
  };
  return {
    myCombats: myCombats.toJS(),
    addCombat,
    deleteCombat,
    current: myCombats.get(current) as TDJ.Combat,
    saveCurrent: (v: any) => {
      const newList = myCombats.set(current, v);
      setMyCombats(newList);
      localStorage.setItem('myCombats', JSON.stringify(newList.toJS()));
    },
    // setCurrent: (v: number) => {
    //   const obj = myCombats.find((o: any) => {
    //     return o.id === v;
    //   });
    //   setCurrent(myCombats.indexOf(obj) as number);
    // },
  };
};
