export type Option = {
    /** text displayed to the user in the filter dropdown */
    label: string,
    /** key for manipulation */
    value: string | number | boolean,

}

export type Filter = {
    id: string,
    label: string,
    negated?: boolean,
    options?: Array<Option>,
    sorted?: boolean,
    type: 'singleSelect' | 'multiSelect' | 'text',
}