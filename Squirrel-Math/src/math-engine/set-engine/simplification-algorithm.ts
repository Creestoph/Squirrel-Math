import { Set } from './set';
import { SetSum } from './set-sum';
import { FiniteSet } from './finite-set';

function simplifyFiniteSet(set: FiniteSet) {
    if (set.elements.length == 0)
        return Set.empty;
    return set;
}

//TODO: interval interference
function simplifySetSum(set: SetSum) {
    let simpleAddends = set.addends.map(a => simplifySet(a)).filter(a => !a.equals(Set.empty));

    let finiteElements = simpleAddends.filter(s => s instanceof FiniteSet).flatMap(s => (s as FiniteSet).elements);

    for (let i = 0; i < simpleAddends.length; i++) {
        if (simpleAddends[i] instanceof FiniteSet) {
            finiteElements.push(...(simpleAddends[i] as FiniteSet).elements);
            simpleAddends.splice(i--, 1);
        }
    }

    simpleAddends.forEach(s => {
        for (let i = 0; i < finiteElements.length; i++)
            if (s.includes(finiteElements[i]))
                finiteElements.splice(i--);
    });

    simpleAddends.push(new FiniteSet(...finiteElements));

    if (simpleAddends.length == 0)
        return Set.empty;
    if (simpleAddends.length == 1)
        return simpleAddends[0];
    return new SetSum(...simpleAddends);
}

export function simplifySet(set: Set): Set {
    if (set instanceof FiniteSet)
        return simplifyFiniteSet(set);
    if (set instanceof SetSum)
        return simplifySetSum(set);
    return set;
}