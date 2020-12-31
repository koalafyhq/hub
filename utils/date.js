import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export function dayAgo(date) {
  return formatDistanceToNow(new Date(date), {
    locale: id,
    addSuffix: true,
  })
}
