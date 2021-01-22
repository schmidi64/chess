function calculateNextSteps(square: string[][], field: string, ri: number, fi: number): number[][] | undefined {


    // Anaylse next steps
    const checkIfPawnIsInital = (ri: number, nextStep: number[]) => ri === 1 && /11./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] - 1][nextStep[1]] === '0' ? nextStep : ri === 6 && /21./.test(field) && square[nextStep[0]][nextStep[1]] === '0' && square[nextStep[0] + 1][nextStep[1]] === '0' ? nextStep : []
    const checkIfFigureIsAhead = (nextStep: number[]) => square[nextStep[0]][nextStep[1]] !== '0' ? [] : nextStep
    const checkIfPawnCanBeat = (colour: string, nextStep: number[]) => colour === 'white' && /2./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : colour === 'black' && /1./.test(square[nextStep[0]][nextStep[1]]) ? nextStep : []

    // calculate next steps by figure
    const calculationForWhitePawns = (field: string, ri: number, fi: number) => 
        ri + 1 <= 7 ?
            new Array(checkIfPawnIsInital(ri, [ri + 2, fi]), checkIfFigureIsAhead([ri + 1, fi]), checkIfPawnCanBeat('white', [ri + 1, fi + 1]), checkIfPawnCanBeat('white', [ri + 1, fi - 1])) :
            undefined

    const calculationForBlackPawns = (field: string, ri: number, fi: number) =>
        ri - 1 >= 0 ?
            new Array(checkIfPawnIsInital(ri, [ri - 2, fi]), checkIfFigureIsAhead([ri - 1, fi]), checkIfPawnCanBeat('black', [ri - 1, fi + 1]), checkIfPawnCanBeat('black', [ri - 1, fi - 1])) :
            undefined 

    const calculationForBishops = (field: string, ri: number, fi: number) => {
        let steps: number [][] = []

        let newri = ri
        let newfi = fi
        while(newfi >= 0 && newri >= 0) {
            if(newri !== ri && newfi !== fi) {
                steps.push([newri, newfi])
            }

            newri--
            newfi--
        }

        newri = ri
        newfi = fi
        while(newfi <= 7 && newri >= 0) {
            if(newri !== ri && newfi !== fi) {
                steps.push([newri, newfi])
            }

            newri--
            newfi++
        }

        newri = ri
        newfi = fi
        while(newri <= 7 && newfi >= 0) {
            if(newri !== ri && newfi !== fi) {
                steps.push([newri, newfi])
            }

            newri++
            newfi--
        }

        newri = ri
        newfi = fi
        while(newri <= 7 && newfi <= 7) {
            if(newri !== ri && newfi !== fi) {
                steps.push([newri, newfi])
            }
            
            newri++
            newfi++
        }

        return steps
    }


    return (() => 
        /11./.test(field) ? calculationForWhitePawns(field, ri, fi) :
        /21./.test(field) ? calculationForBlackPawns(field, ri, fi) :
        /.3./.test(field) ? calculationForBishops(field, ri, fi) :
        undefined
    )()

}

export { calculateNextSteps }