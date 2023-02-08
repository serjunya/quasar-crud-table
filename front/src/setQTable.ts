import { adjectives, nouns, verbs, names, languages, chars } from 'app/public/arrays';

type Column = {
    name: string;
    label: string;
    field: string | ((row: any) => any);
    required?: boolean;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    sort?: (a: any, b: any, rowA: any, rowB: any) => number;
    sortOrder?: 'ad' | 'da';
    format?: (val: any, row: any) => any;
    style?: string | ((row: any) => string);
    classes?: string | ((row: any) => string);
    headerStyle?: string;
    headerClasses?: string;
  };
const randomElement = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
const isVowel = (char: string) => {
    return char === 'a' || char === 'e' || char === 'i' || char === 'o';
}

export const setColumns = (entity: {properties: [], name: string, title: string}) => {
    const columns: Column[] = [];
    entity.properties.forEach((item: {
        name: string,
        title: string,
        dataType: string,
        defaultValue?: any,
    }) => {
        const column: Column = {
            name: item.name,
            label: item.title,
            field: item.name
        };
        switch (item.dataType) {
            case 'Date':
                column.format = (val: string) => `${new Date(val).toLocaleString()}`;
                break;
            case 'number':
                column.format = (val: string) => `${Number(val || item.defaultValue)}`;
                break;
            default:
                column.align = 'left';
                column.style = 'max-width: 14vw; overflow: auto'
        }
        columns.push(column);
    })
    return columns;
}
export const randomNumber = () => Math.floor(Math.random() * 100);
export const randomName = () => randomElement(names);
export const randomDate = () => Math.random() * new Date().getTime();
export const randomLang = () => randomElement(languages);
export const generateConcat = () => {
    const adjective = randomElement(adjectives);
    const randomNoun = randomElement(nouns);
    const noun = randomNoun[0].toUpperCase() + randomNoun.slice(1);
    return adjective + noun;
}
export const generatePassword = () => {
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += randomElement(chars);
    }
    return password;
}
export const generateText = () => {
    let text = '';
    const sentenceCount = 1 + Math.floor(Math.random() * 4);
    for (let i = 0; i < sentenceCount; i++) {
        const subject = randomElement(nouns),
            verb = randomElement(verbs),
            object = randomElement(nouns);
        const subjAdjCount = Math.floor(Math.random() * 5);
        const objAdjCount = Math.floor(Math.random() * 5);
        let sentence = '';
        for (let k = 0; k < subjAdjCount; k++) {
            sentence += randomElement(adjectives) + ' ';
        }
        sentence += subject + ' ' + verb;
        let objPart = '';
        for (let k = 0; k < objAdjCount; k++) {
            objPart += randomElement(adjectives) + ' ';
        }
        objPart += object + '.';
        if (isVowel(objPart[0])) {
            sentence += ' an ';
        }
        else {
            sentence += ' a ';
        }
        sentence += objPart;
        text += sentence[0].toUpperCase() + sentence.slice(1) + ' ';
    }
    return text;
}
