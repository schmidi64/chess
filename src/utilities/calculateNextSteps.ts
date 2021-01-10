import { unwatchFile } from "fs"

function calculateNextSteps(field: string, ri: number, fi: number): number[][] {
    if(/11./.test(field)) {
        return [[ri + 1, fi]]
    } else if(/21./.test(field)) {
        return [[ri - 1, fi]]       
    } else {
        return []
    }

}

export { calculateNextSteps }