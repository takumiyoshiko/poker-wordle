import GraphemeSplitter from 'grapheme-splitter'
import { solution } from './hands'
import { MAX_CARD_LENGTH } from '../constants/settings'

const { evaluateCards } = require('phe')

const graphemeSplitter = new GraphemeSplitter()

export type CardStatus = 'absent' | 'present' | 'correct' | 'rankPresent'
export type HandStatus = 'high' | 'low' | 'hit' | 'waiting'

const unicodeToRank: { [id: string]: string } = {
  '🃁': 'Ad',
  '🃂': '2d',
  '🃃': '3d',
  '🃄': '4d',
  '🃅': '5d',
  '🃆': '6d',
  '🃇': '7d',
  '🃈': '8d',
  '🃉': '9d',
  '🃊': 'Td',
  '🃋': 'Jd',
  '🃍': 'Qd',
  '🃎': 'Kd',
  '🃑': 'Ac',
  '🃒': '2c',
  '🃓': '3c',
  '🃔': '4c',
  '🃕': '5c',
  '🃖': '6c',
  '🃗': '7c',
  '🃘': '8c',
  '🃙': '9c',
  '🃚': 'Tc',
  '🃛': 'Jc',
  '🃝': 'Qc',
  '🃞': 'Kc',
  '🂱': 'Ah',
  '🂲': '2h',
  '🂳': '3h',
  '🂴': '4h',
  '🂵': '5h',
  '🂶': '6h',
  '🂷': '7h',
  '🂸': '8h',
  '🂹': '9h',
  '🂺': 'Th',
  '🂻': 'Jh',
  '🂽': 'Qh',
  '🂾': 'Kh',
  '🂡': 'As',
  '🂢': '2s',
  '🂣': '3s',
  '🂤': '4s',
  '🂥': '5s',
  '🂦': '6s',
  '🂧': '7s',
  '🂨': '8s',
  '🂩': '9s',
  '🂪': 'Ts',
  '🂫': 'Js',
  '🂭': 'Qs',
  '🂮': 'Ks',
}

// // For keyboard
export const getStatuses = (
  guesses: string[],
  currentGuess: string
): { [key: string]: CardStatus } => {
  const charObj: { [key: string]: CardStatus } = {}

  const i = graphemeSplitter.splitGraphemes(currentGuess).length
  if (i === MAX_CARD_LENGTH) return charObj

  const splitSolution = graphemeSplitter.splitGraphemes(solution)

  // let keysSetToRankPresent = new Set<string>()
  guesses.forEach((hand) => {
    const letter = graphemeSplitter.splitGraphemes(hand)[i]
    const guessRank = unicodeToRank[letter].charAt(0)
    const guessSuit = unicodeToRank[letter].charAt(1)
    const solutionLetter = splitSolution[i]
    const solutionRank = unicodeToRank[solutionLetter].charAt(0)
    const solutionSuit = unicodeToRank[solutionLetter].charAt(1)
    if (letter === solutionLetter) {
      Object.keys(unicodeToRank).map((card) => {
        if (card === letter) {
          charObj[card] = 'correct'
        } else {
          charObj[card] = charObj[card] === 'present' ? 'present' : 'absent'
        }
        return null
      })
    } else if (guessRank === solutionRank || guessSuit === solutionSuit) {
      Object.keys(unicodeToRank).map((card) => {
        const cardRank = unicodeToRank[card].charAt(0)
        const cardSuit = unicodeToRank[card].charAt(1)
        if (card === letter) {
          charObj[card] = 'present'
        } else if (cardRank !== guessRank && cardSuit !== guessSuit) {
          charObj[card] = charObj[card] === 'present' ? 'present' : 'absent'
        }
        return null
      })
    } else {
      Object.keys(unicodeToRank).map((card) => {
        const cardRank = unicodeToRank[card].charAt(0)
        const cardSuit = unicodeToRank[card].charAt(1)
        if (cardRank === guessRank || cardSuit === guessSuit) {
          charObj[card] = 'absent'
        }
        return null
      })
    }
  })

  return charObj
}

// For Cell
export const getGuessStatuses = (guess: string): CardStatus[] => {
  // console.log(guess)
  const splitSolution = graphemeSplitter.splitGraphemes(solution)
  const splitGuess = graphemeSplitter.splitGraphemes(guess)

  const statuses: CardStatus[] = Array.from(Array(guess.length))

  // Deal with rank present at last
  splitGuess.forEach((letter, i) => {
    const guessRank = unicodeToRank[letter].charAt(0)
    const guessSuit = unicodeToRank[letter].charAt(1)
    const solutionRank = unicodeToRank[splitSolution[i]].charAt(0)
    const solutionSuit = unicodeToRank[splitSolution[i]].charAt(1)
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
    } else if (guessRank === solutionRank) {
      statuses[i] = 'present'
    } else if (guessSuit === solutionSuit) {
      statuses[i] = 'present'
    } else {
      statuses[i] = 'absent'
    }
    return
  })
  return statuses
}

function toCardString(x: string): string {
  return unicodeToRank[x]
}

function cardString(cards: string[]): string[] {
  return cards.map(toCardString)
}

function checkUpLow(guessStrength: number, solutionStrength: number): any {
  if (guessStrength < solutionStrength) {
    return 'high'
  } else if (guessStrength > solutionStrength) {
    return 'low'
  } else if (guessStrength === solutionStrength) {
    return 'hit'
  }
}

export const getGuessHighLowStatus = (
  guess: string[],
  solution: string[]
): 'high' | 'low' | 'hit' => {
  const guessStrength = evaluateCards(cardString(guess))
  const solutionStrength = evaluateCards(cardString(solution))
  return checkUpLow(guessStrength, solutionStrength)
}
