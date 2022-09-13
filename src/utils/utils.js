//Функция возвращает расстояние между заголовком раздела и верхней границей рамки родительского блока
export function getDistanceBetweenPoints(elem, viewportCoords) {
  const coordsChild = elem.getBoundingClientRect();
  return Math.abs(viewportCoords.top - coordsChild.top) ;
}
