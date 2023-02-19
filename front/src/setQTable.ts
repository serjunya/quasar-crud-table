import { adjectives, nouns, verbs, names, languages, chars } from 'app/public/arrays';
import { Entity } from './Entity';

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
}
type Input = {
    label: string;
    model: string;
    rules: ((val: any) => any)[];
    type?: "number" | "textarea" | "time" | "text" | "password"
    | "email" | "search" | "tel" | "file" | "url" | "date";
    stack_label?: boolean
}
type EntityField = {
    name: string,
    title: string,
    dataType: string,
    defaultValue?: any
}
const randomElement = (arr: any) => arr[Math.floor(Math.random() * arr.length)];
const isVowel = (char: string) => {
    return char === 'a' || char === 'e' || char === 'i' || char === 'o';
}

export const entityTemplate: Map<string, any> = new Map;
export const setColumns = (entity: {properties: [], name: string, title: string}) => {
    const columns: Column[] = [];
    entity.properties.forEach((item: EntityField) => {
        const column: Column = {
            name: item.name,
            label: item.title,
            field: item.name
        }
        switch (item.dataType) {
            case 'Date':
                entityTemplate.set(item.name, Date);
                column.format = (val: string) => `${new Date(val).toLocaleDateString()}`;
                break;
            case 'number':
                entityTemplate.set(item.name, Number);
                column.format = (val: string) => `${Number(val || item.defaultValue)}`;
                break;
            default:
                entityTemplate.set(item.name, String);
                column.align = 'left';
                column.style = 'max-width: 14vw; overflow: auto'
        }
        columns.push(column);
    })
    return columns;
}
export const setFormInputs = (entity: {properties: [], name: string, title: string}) => {
    const inputs: Input[] = [];
    entity.properties.forEach((item: EntityField) => {
        if (item.name !== '_id') {
            const input: Input = {
                label: item.title,
                model: item.name,
                rules: [],
                type: 'text'
            }
            switch (item.dataType) {
                case 'Date':
                    input.stack_label = true;
                    input.type = 'date';
                    input.rules = [ (val: string) => !!val || 'Введите данные' ];
                    break;
                case 'number':
                    input.type = 'number';
                    input.rules = [ (val: number) => !!val && Number.isInteger(+val)
                        || 'Введите целое число' ];
                    break;
                case 'password':
                    input.type = 'password';
                default:
                    input.rules = [ (val: string) => !!val || 'Введите данные' ];
            }
            inputs.push(input);
        }
    })
    return inputs;
}
export const setProps = (row: Entity) => {
    const props: Map<string, string> = new Map;
    for (const prop in row) {
        props.set(prop, row[prop]);
    }
    return Object.fromEntries(props.entries());
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
