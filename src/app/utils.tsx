export const lerp = (y, a) => 2 * (1 - a / 10) + y * (a / 10);
export const reverseOrder = (i, arr) => Math.abs((i % arr.length) - arr.length);

export const isInside = (circle_x, circle_y, rad, x, y) => {
  // Compare radius of circle with
  // distance of its center from
  // given point
  if (
    (x - circle_x) * (x - circle_x) + (y - circle_y) * (y - circle_y) <=
    rad * rad
  )
    return true;
  else return false;
};
