import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  setIsHandsModalOpen: (value: boolean) => void
}

export const InfoModal = ({
  isOpen,
  handleClose,
  setIsHandsModalOpen,
}: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the poker hand in 6 tries. After each guess, the color of the
        tiles will change to show how close your guess was to the actual hand.
      </p>

      <p className="text-sm text-red-500 mt-2 mb-5">
        The hand is sorted by rankings from highest to lowest (A♠, A♥, A♣, A♦,
        K♠, K♥, ..., 2♦) and follows the order of quads, triples, pairs and
        singles.
        <br />
        <span
          className="text-xs text-red-500 hover:text-red-600 hover:cursor-pointer underline font-bold"
          onClick={() => setIsHandsModalOpen(true)}
        >
          Click here to view examples
        </span>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂡" status="correct" />
        <Cell value="🂾" />
        <Cell value="🃍" />
        <Cell value="🃛" />
        <Cell value="🃚" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card A♠ has the correct rank and suit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂽" />
        <Cell value="🃝" />
        <Cell value="🃍" status="present" />
        <Cell value="🂮" />
        <Cell value="🂾" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card Q♦ has the correct rank or suit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🂱" />
        <Cell value="🃅" status="absent" />
        <Cell value="🃔" />
        <Cell value="🂣" />
        <Cell value="🂲" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card 5♦ has an incorrect rank and suit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell status="high" target="strength" />
        <Cell status="low" target="strength" />
        <Cell status="hit" target="strength" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The card TOO HIGH means that your guess is higher than the actural hand.
        The card TOO LOW means the opposite. The card HIT means that your guess
        and the actual hand are of equal rank.
      </p>
    </BaseModal>
  )
}
