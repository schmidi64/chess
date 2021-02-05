// 1: Colour 
    // -> 1 = White
    // -> 2 = Black

// 2: figure
//  -> 1 = Pawns
//  -> 2 = Knights
// ->  3 = Bishops
//  -> 4 = Rooks
//  -> 5 = Queen
// ->  6 = King

// 3: ID

export const startSquare: string[][] = [
    ['141', '121', '131', '161', '151', '132', '122', '142'],
    ['111', '112', '113', '114', '115', '116', '117', '118'],
    [ '0',  '141',  '0',  '0',  '0',  '0',  '0',  '0'],
    [ '0',  '0',  '141',  '0',  '0',  '0',  '0',  '0'],
    [ '0',  '0',  '0',  '0',  '0',  '0',  '0',  '241'],
    [ '261',  '0',  '0',  '0',  '0',  '0',  '0',  '0'],
    ['211', '212', '213', '214', '215', '216', '217', '218'],
    ['241', '221', '231', '0', '251', '232', '222', '242'],
]