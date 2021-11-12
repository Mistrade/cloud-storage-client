import {CSSProperties, LabelHTMLAttributes, ReactNode} from 'react'

export type HTMLLabelPropsNotRequired = {
	[key in keyof LabelHTMLAttributes<HTMLLabelElement>]?: LabelHTMLAttributes<HTMLLabelElement>[key]
}

export interface LabelComponentProps  {
	labelHTMLProps?: HTMLLabelPropsNotRequired,
	text: string | ReactNode,
	inputIsRequired?: boolean
}