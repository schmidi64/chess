import { unwatchFile } from "fs"

function calculateNextSteps(field: string, ri: number, fi: number): number[][] {
    if(/11./.test(field) && ri + 1 <= 7) {
        return [[ri + 1, fi]]
    } else if(/21./.test(field) && ri - 1 >= 0) {
        return [[ri - 1, fi]]       
    } else {
        return []
    }

}

export { calculateNextSteps }