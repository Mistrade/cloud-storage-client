import {FC} from 'react'
import {LabelComponentProps} from './types'
import style from './style.module.sass'

export const Label: FC<LabelComponentProps> = ({
	                                               labelHTMLProps = {},
	                                               text= '',
	                                               inputIsRequired = false,
	                                               children
                                               }) => {
	const attributes = labelHTMLProps
	if(!attributes?.className){
		attributes.className = style.defaultLabel
	}
	
	return (
		<label {...attributes}>
			{typeof text === 'string' && inputIsRequired ? (
				<>
					{text}<span className={style.requiredStar}>*</span>
				</>
			) : text || children}
		</label>
	)
}