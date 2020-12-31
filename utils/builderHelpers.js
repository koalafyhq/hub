import { DEPLOYMENT_STATUS, BUILDER_TYPE } from 'utils/constants'

export function humanizeBuilderName(builderType) {
  const [programmingLanguage, version] = builderType.split(':')

  return `${BUILDER_TYPE[programmingLanguage]}, v${version}`
}

export function getBadgeColor(status) {
  if (!status) return ''

  return status === DEPLOYMENT_STATUS.SUCCESS ? 'green' : 'red'
}
