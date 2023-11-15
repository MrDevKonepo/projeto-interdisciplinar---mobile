// Cálculo da Moda
const calculateMode = (array) => {
    let modeMap = {};
    let maxCount = 0;
    let modes = [];

    array.forEach((value) => {
        if (!modeMap[value]) {
            modeMap[value] = 1;
        } else {
            modeMap[value]++;
        }

        if (modeMap[value] > maxCount) {
            modes = [value];
            maxCount = modeMap[value];
        } else if (modeMap[value] === maxCount) {
            modes.push(value);
        }
    });

    if (modes.length === Object.keys(modeMap).length) {
        modes = [];
    }

    return modes;
};

export default calculateMode;