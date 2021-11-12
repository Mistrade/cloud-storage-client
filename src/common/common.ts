export const DisableSymRegExp = new RegExp(/(<)|(>)|(])|(\[)|({)|(})|(\^)|(§)|(±)|(~)/, 'gi')
export const NameRegularExpression = new RegExp(/^[А-ЯЁё'][а-яЁё']*([\s]?[-]?[\s]?[А-ЯЁё'][а-яЁё']*)?$/, 'i')
export const JobTitleRegularExpression = new RegExp(/^([А-Яа-яA-Za-z0-9']*[\s]?[-]?[\s]?){1,10}$/i)
export const MobilePhoneRegularExpression = new RegExp(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i)
export const OnlyIntegerRegularExpression = new RegExp(/^[0-9]{4,}$/)
export const ConfirmCodeRegularExpression = new RegExp(/^[0-9]{4,6}$/i);
export const BornCityRegularExpression = new RegExp(/^((р-н|гор|г|с|р-на|обл|пос|[А-Яа-яЁё]){1,15}(\s|\.|[,]|-)+)*([А-Яа-яЁё]{2,}\s?\.?[-]?[,]?)+|([А-Яа-яЁё]{2,}\s?\.?[-]?[,]?)+((р-н|гор|г|с|р-на|обл|пос|[А-Яа-яЁё]){1,15}(\s|\.|[,]|-)+)*$/i)
export const SeriesAndNumberPassportRegularExpression = new RegExp(/^[0-9]{4}\s[0-9]{6}$/i);
export const DepartmentCodeRegularExpression = new RegExp(/[0-9]{3}-[0-9]{3}/i)
export const FindUrlRegularExpression = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)