import { KeyValue } from '../../lib/keyboard'

type Props = {
  card: KeyValue | string | undefined
}

export const CardDisplay = ({ card }: Props) => {
  if (card === undefined) return null
  const display = unicodeToDisplayMap[card]
  let classes = ''
  if (display) {
    classes = getColour(display)
  }
  return <span className={classes}>{display}</span>
}

const getColour = (card: string): string => {
  if (card.includes('♦') || card.includes('♥')) {
    return 'text-red-500'
  } else {
    return 'text-black'
  }
}

export const unicodeToDisplayMap: { [id: string]: string } = {
  '🃁': 'A♦',
  '🃂': '2♦',
  '🃃': '3♦',
  '🃄': '4♦',
  '🃅': '5♦',
  '🃆': '6♦',
  '🃇': '7♦',
  '🃈': '8♦',
  '🃉': '9♦',
  '🃊': '10♦',
  '🃋': 'J♦',
  '🃍': 'Q♦',
  '🃎': 'K♦',
  '🃑': 'A♣',
  '🃒': '2♣',
  '🃓': '3♣',
  '🃔': '4♣',
  '🃕': '5♣',
  '🃖': '6♣',
  '🃗': '7♣',
  '🃘': '8♣',
  '🃙': '9♣',
  '🃚': '10♣',
  '🃛': 'J♣',
  '🃝': 'Q♣',
  '🃞': 'K♣',
  '🂱': 'A♥',
  '🂲': '2♥',
  '🂳': '3♥',
  '🂴': '4♥',
  '🂵': '5♥',
  '🂶': '6♥',
  '🂷': '7♥',
  '🂸': '8♥',
  '🂹': '9♥',
  '🂺': '10♥',
  '🂻': 'J♥',
  '🂽': 'Q♥',
  '🂾': 'K♥',
  '🂡': 'A♠',
  '🂢': '2♠',
  '🂣': '3♠',
  '🂤': '4♠',
  '🂥': '5♠',
  '🂦': '6♠',
  '🂧': '7♠',
  '🂨': '8♠',
  '🂩': '9♠',
  '🂪': '10♠',
  '🂫': 'J♠',
  '🂭': 'Q♠',
  '🂮': 'K♠',
}
