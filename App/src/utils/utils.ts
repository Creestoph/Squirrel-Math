export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function numeralNoun(count: number, noun: 'cyfrę' | 'raz'): string {
    return (
        `$${count}$ ` +
        (() => {
            if (noun == 'cyfrę') {
                if (count == 1) {
                    return 'cyfrę';
                } else if ((count % 10 == 2 || count % 10 == 3 || count % 10 == 4) && count / 10 != 1) {
                    return 'cyfry';
                } else {
                    return 'cyfr';
                }
            } else {
                if (count == 1) {
                    return 'raz';
                } else {
                    return 'razy';
                }
            }
        })()
    );
}
