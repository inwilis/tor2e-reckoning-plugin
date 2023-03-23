import {ReckoningDate} from "../ReckoningDate";
import {StewardsMonth} from "./StewardsMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {StewardsLocalization} from "./StewardsLocalization";
import {STEWARDS_RECKONING_START} from "./StewardsReckoning";

export class StewardsReckoningDate extends ReckoningDate<StewardsMonth> {

    constructor(reckoning: Reckoning<StewardsMonth>, year: number, month: StewardsMonth, day: number) {
        if (year < STEWARDS_RECKONING_START) {
            throw new RangeError(`Year ${year} is before the ${STEWARDS_RECKONING_START}, when Steward's Reckoning started`)
        }

        super(reckoning, year, month, day)
    }

    getDayOfWeek(): DayOfWeek {
        const daysAfterReckoningStart = this.reckoning.getDaysBetween(this.reckoning.newDate(2060, StewardsMonth.I1, 1), this);
        return daysAfterReckoningStart % 7;
    }

    toQuenya(): string {
        if (this.month.toString().startsWith("M") || this.month == StewardsMonth.I3L) {
            return `${this.day} ${StewardsLocalization.forMonth(this.month).quenya} ${this.year}`
        } else {
            return `${StewardsLocalization.forMonth(this.month).quenya} ${this.year}`
        }
    }

    toSindarin(): string {
        if (this.month.toString().startsWith("M") || this.month == StewardsMonth.I3L) {
            return `${this.day} ${StewardsLocalization.forMonth(this.month).sindarin} ${this.year}`
        } else {
            return `${StewardsLocalization.forMonth(this.month).sindarin} ${this.year}`
        }
    }

    toString(language: string): string {
        if (language?.toLowerCase() == "quenya") {
            return this.toQuenya()

        } else if (language?.toLowerCase() == "sindarin") {
            return this.toSindarin()

        } else {
            return this.toQuenya()
        }
    }

    toDayOfWeekString(language: string): string {
        if (language?.toLowerCase() == "quenya") {
            return StewardsLocalization.forDayOfWeek(this.getDayOfWeek()).quenya

        } else if (language?.toLowerCase() == "sindarin") {
            return StewardsLocalization.forDayOfWeek(this.getDayOfWeek()).sindarin

        } else {
            return StewardsLocalization.forDayOfWeek(this.getDayOfWeek()).quenya
        }
    }
}
