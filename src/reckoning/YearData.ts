import {YearType} from "./YearType";

export interface YearDataFields<M extends number | string> {
    type: YearType
    length: number
    monthSequence: M[]
    monthDays: Record<M, [number, number]>
}

export class YearData<M extends number | string> {
    readonly type: YearType
    readonly length: number
    readonly monthSequence: M[]
    readonly monthDays: Record<M, [number, number]>


    constructor(params: YearDataFields<M>) {
        this.type = params.type;
        this.length = params.length;
        this.monthSequence = params.monthSequence;
        this.monthDays = params.monthDays;
    }

    hasMonth(month: M): boolean {
        return this.monthSequence.includes(month)
    }

    getDaysInMonth(month: M): number {
        return this.monthDays[month][1] - this.monthDays[month][0] + 1;
    }

    getFirstDay(month: M): number {
        return this.monthDays[month][0]
    }

    getNextMonth(month: M): M {
        const monthIndex = this.monthSequence.indexOf(month)

        if (monthIndex == this.monthSequence.length - 1) {
            return this.monthSequence[0]
        } else {
            return this.monthSequence[monthIndex + 1]
        }
    }

    getMonthForDayOfYear(dayOfYear: number): M {
        for (let month of this.monthSequence) {
            if (this.monthDays[month][0] <= dayOfYear && dayOfYear <= this.monthDays[month][1]) {
                return month
            }
        }

        throw new RangeError(`Unable to find a correct month for day ${dayOfYear} of ${this.type} year`)
    }
}
