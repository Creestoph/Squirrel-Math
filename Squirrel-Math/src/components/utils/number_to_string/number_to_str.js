const numbersLessThan20Names = [
    '',
    'jeden',
    'dwa',
    'trzy',
    'cztery',
    'pięć',
    'sześć',
    'siedem',
    'osiem',
    'dziewięć',
    'dziesięć',
    'jedenaście',
    'dwanaście',
    'trzynaście',
    'czternaście',
    'piętnaście',
    'szesnaście',
    'siedemnaście',
    'osiemnaście',
    'dziewiętnaście',
];
const tensNames = [
    '',
    '',
    'dwadzieścia',
    'trzydzieści',
    'czterdzieści',
    'pięćdziesiąt',
    'sześćdziesiąt',
    'siedemdziesiąt',
    'osiemdziesiąt',
    'dziewięćdziesiąt',
];
const hundredsNames = [
    '',
    'sto',
    'dwieście',
    'trzysta',
    'czterysta',
    'pięćset',
    'sześćset',
    'siedemset',
    'osiemset',
    'dziewięćset',
];
const orders = [
    '',
    'tysiąc',
    'milion',
    'miliard',
    'bilion',
    'biliard',
    'trylion',
    'tryliard',
    'kwadrylion',
    'kwadryliard',
    'kwintylion',
    'kwintyliard',
    'sekstylion',
    'sekstyliard',
    'septylion',
    'septyliard',
    'oktylion',
    'oktyliard',
    'nonylion',
    'nonyliard',
    'decylion',
    'decyliard',
    'undecylion',
    'undecyliard',
    'duodecylion',
    'duodecyliard',
];
const ordersPlural = [
    '',
    'tysiące',
    'miliony',
    'miliardy',
    'biliony',
    'biliardy',
    'tryliony',
    'tryliardy',
    'kwadryliony',
    'kwadryliardy',
    'kwintyliony',
    'kwintyliardy',
    'sekstyliony',
    'sekstyliardy',
    'septyliony',
    'septyliardy',
    'oktyliony',
    'oktyliardy',
    'nonyliony',
    'nonyliardy',
    'decyliony',
    'decyliardy',
    'undecyliony',
    'undecyliardy',
    'duodecyliony',
    'duodecyliardy',
];
const ordersPluralGenitive = [
    '',
    'tysięcy',
    'milionów',
    'miliardów',
    'bilionów',
    'biliardów',
    'trylionów',
    'tryliardów',
    'kwadrylionów',
    'kwadryliardów',
    'kwintylionów',
    'kwintyliardów',
    'sekstylionów',
    'sekstyliardów',
    'septylionów',
    'septyliardów',
    'oktylionów',
    'oktyliardów',
    'nonylionów',
    'nonyliardów',
    'decylionów',
    'decyliardów',
    'undecylionów',
    'undecyliardów',
    'duodecylionów',
    'duodecyliardów',
];

export function numberToStr(input) {
    input = input.replace(/ /g, '');
    input = '0'.repeat((3 - (input.length % 3)) % 3) + input; //add zeros to make sure each group has exactly 3 digits
    const digits = Array.from(input).map((digit) => parseInt(digit));
    if (digits.some((digit) => isNaN(digit)))
        return 'Nie umiesz wpisać liczby naturalnej?';
    if (parseInt(input) === 0) return 'zero';
    let result = '';
    for (let i = digits.length - 1; i >= 0; i -= 3) {
        const units = digits[i];
        const tens = digits[i - 1];
        const hundreds = digits[i - 2];
        const tensAndUnits = 10 * tens + units;
        const group = 100 * hundreds + 10 * tens + units;
        const order = (digits.length - 1 - i) / 3;
        if (order >= orders.length)
            return 'To dla mnie za dużo. Daj mi spokój.';
        let groupString = '';
        if (group === 1 && order > 0) groupString = orders[order];
        else {
            groupString =
                hundredsNames[hundreds] +
                ' ' +
                (tensAndUnits < 20
                    ? numbersLessThan20Names[tensAndUnits]
                    : tensNames[tens] + ' ' + numbersLessThan20Names[units]);
            if (units < 5 && units > 1 && tens !== 1)
                groupString += ' ' + ordersPlural[order];
            else if (group > 0)
                groupString += ' ' + ordersPluralGenitive[order];
        }
        result = groupString + ' ' + result;
    }
    return result;
}
