export default class ScheduleManager {
    constructor(data, userId) {
        this.data = data;
        this.userId = userId;

        if (!this.data.dailyState[this.userId]) {
            this.data.dailyState[this.userId] = {
                doneBy: {},
                selectedBy: {},
                dayLocked: false
            };
        }

        if (!this.data.history) {
            this.data.history = {};
        }
    }

    confirm(activity, optionId = null) {
        const daily = this.data.dailyState[this.userId];
        if (daily.dayLocked) return;

        if (!daily.doneBy[activity.id]) {
            daily.doneBy[activity.id] = {};
        }

        if (optionId === null) {
            daily.doneBy[activity.id][this.userId] = true;
        } else {
            if (!daily.selectedBy[activity.id]) {
                daily.selectedBy[activity.id] = {};
            }

            daily.selectedBy[activity.id][this.userId] = optionId;
            daily.doneBy[activity.id][this.userId] = true;
        }
    }

    // 🔹 CERRAR DÍA + GUARDAR HISTORIAL
    newDay() {
        const today = new Date().toISOString().slice(0, 10);
        const daily = this.data.dailyState[this.userId];

        const totalMandatory = this._countTotalMandatory();
        const mandatoryCompleted = this._countMandatoryCompleted();

        const validDay =
            totalMandatory > 0 &&
            mandatoryCompleted === totalMandatory;

        if (!this.data.history[today]) {
            this.data.history[today] = {};
        }

        this.data.history[today][this.userId] = {
            doneBy: structuredClone(daily.doneBy),
            selectedBy: structuredClone(daily.selectedBy),
            mandatoryCompleted,
            totalMandatory,
            validDay
        };

        // Reset del día
        this.data.dailyState[this.userId] = {
            doneBy: {},
            selectedBy: {},
            dayLocked: false
        };
    }

    // =====================
    // Helpers privados
    // =====================

    _countTotalMandatory() {
        const routines = this.data.routines[this.userId];
        let count = 0;

        Object.values(routines).forEach(block => {
            block.forEach(activity => {
                if (activity.mandatory === true) {
                    count++;
                }
            });
        });

        return count;
    }

    _countMandatoryCompleted() {
        const routines = this.data.routines[this.userId];
        const daily = this.data.dailyState[this.userId];

        let count = 0;

        Object.values(routines).forEach(block => {
            block.forEach(activity => {
                if (
                    activity.mandatory === true &&
                    daily.doneBy?.[activity.id]?.[this.userId]
                ) {
                    count++;
                }
            });
        });

        return count;
    }
}