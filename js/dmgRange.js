export function dmgRange(max) {
    if(!max) return max; //safety

    //minimum % range for damage from atk(if 50%: atk: 10 -> range(min(5), max(10)))
    const rangePercent = 50,
          min = (max / 100) * rangePercent;
    return Math.round(Math.random() * (max - min + 1) + min);
}