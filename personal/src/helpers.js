export const rangeValue = (val, min, max) => (val < min ? min : ((val > max) ? max : val))

export const loop = (val, min, max) => (val < min ? max : ((val > max) ? min : val))

export function debounce(fn, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, arguments), (wait || 1));
    }
}

export function throttle(fn, delay) {
    return function () {
        var now = +(new Date())
        if (!fn.lastExecuted || fn.lastExecuted + delay < now) {
            fn.lastExecuted = now
            fn.apply(fn, arguments)
        }
    }
}