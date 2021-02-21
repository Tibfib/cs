import isPlainObject from 'lodash.isplainobject';

export type StyleValue<StyleProperties> =
    | string
    | null
    | false
    | undefined
    | StyleProperties;

export type StyleList<StyleProperties> = Array<
    StyleValue<StyleProperties> | StyleList<StyleProperties>
>;

export function generate<StyleProperties>(
    css: (properties: StyleProperties) => string
) {
    return function cs(...classNames: StyleList<StyleProperties>): string {
        return classNames
            .flat(Infinity)
            .filter((c: StyleValue<StyleProperties>) => c)
            .map(c => (isPlainObject(c) ? css(c as StyleProperties) : c))
            .join(' ');
    };
}
