function calculateNextSteps(field: string, ri: number, fi: number): number[][] | undefined {

    const checkIfPawnIsInital = (ri: number) => ri === 1 && /11./.test(field) || ri === 6 && /21./.test(field) ? true : false

    if (/11./.test(field) && ri + 1 <= 7) {
        let nextSteps: number[][] = []
        if (checkIfPawnIsInital(ri)) {
            nextSteps.push([ri + 1, fi], [ri + 2, fi])
        } else {
            nextSteps.push([ri + 1, fi])
        }
        return nextSteps

    } else if (/21./.test(field) && ri - 1 >= 0) {
        let nextSteps: number[][] = []
        if (checkIfPawnIsInital(ri)) {
            nextSteps.push([ri - 1, fi], [ri - 2, fi])
        } else {
            nextSteps.push([ri - 1, fi])
        }
        return nextSteps

    } else {
        return []
    }



}



export { calculateNextSteps }