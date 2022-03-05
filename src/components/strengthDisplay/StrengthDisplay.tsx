import { HandStatus } from '../../lib/statuses'
import balance from './balance.svg'

type Props = {
  strength: HandStatus
}

export const StrengthDisplay = ({ strength }: Props) => {
  const display = (() => {
    switch (strength) {
      case 'high': {
        return 'TOO HIGH'
      }
      case 'low': {
        return 'TOO LOW'
      }
      case 'hit': {
        return 'HIT'
      }
      case 'waiting': {
        return (
          <img
            src={balance}
            alt="balance.svg"
            width="70%"
            style={{ display: 'inline' }}
          />
        )
      }
      default: {
        return ''
      }
    }
  })()
  return (
    <div
      className="text-black text-center text-sm"
      style={{ lineHeight: '1.1em' }}
    >
      {display}
    </div>
  )
}
