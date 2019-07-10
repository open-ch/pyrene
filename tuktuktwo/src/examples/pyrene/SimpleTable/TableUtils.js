// https://github.com/tannerlinsley/react-table/blob/e2bb09d8b2899ee275abd17b6c61dc223f2e2d38/src/utils.js#L3

function flattenDeep(arr, newArr = []) {
  if (!Array.isArray(arr)) {
    newArr.push(arr);
  } else {
    for (let i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function makePathArray(obj) {
  return flattenDeep(obj)
    .join('.')
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.');
}

export default function getBy(obj, path, def) {
  if (!path) {
    return obj;
  }
  const pathObj = makePathArray(path);
  let val;
  try {
    val = pathObj.reduce((cursor, pathPart) => cursor[pathPart], obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}
