const SCRAMBLE_FPS = 60
const secToFPS = sec => Math.floor(sec * SCRAMBLE_FPS)

// Inclusive
function randInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Exponential tween
function exponent (x) {
	return Math.pow(2, 10 * (x - 1))
}

// Disrupt message
class DisruptedText {
  constructor (string, animTime, modifyChance = 1, allowBlank = true, useExponent = false) {
    this.frame = 0
    this.string = string
    this.chars = []
    this.scrambleSpd = secToFPS(0.1)
    this.exponential = useExponent
    this.modifyChance = modifyChance

    this.obfuscatedChars = 'abcdefghijklmnopqrstuvqxyz1234567890'

    for (let char of string) {
      let showFrame = (allowBlank ? randInt(0, animTime * 0.3) : 0)
      let stopFrame

      if (this.useExponent) {
        // Exponential effect trail off
        let pct = exponent(Math.random())
        stopFrame = pct * Math.floor(animTime - showFrame) + showFrame
      } else {
        stopFrame = randInt(animTime - showFrame, showFrame)
      }

      this.chars.push({
        allowScramble: (Math.random() < this.modifyChance),
        current: ' ',
        target: char,
        showFrame: showFrame,
        stopFrame: stopFrame,
        phaseOffset: randInt(0, this.scrambleSpd - 1)
      })
    }
  }

  getRandomChar () {
    let char = randInt(0, this.obfuscatedChars.length - 1)
    return this.obfuscatedChars[char]
  }

  update () {
    let didUpdate = false

    for (let char of this.chars) {
      // Don't animate spaces
      if (char.target !== ' ') {
        if (this.frame >= char.showFrame && this.frame < char.stopFrame) {
          // Obfuscate chars
          if ((this.frame + char.phaseOffset) % Math.floor(this.scrambleSpd) === 0) {
            char.current = this.getRandomChar()
            didUpdate = true
          }
        } else if (this.frame >= char.stopFrame && char.current !== char.target) {
          char.current = char.target
          didUpdate = true
        }
      }
    }

    this.frame++
    this.scrambleSpd += 1 / SCRAMBLE_FPS
    return didUpdate
  }

  get value () {
    return this.chars.reduce((acc, char) => {
      return acc + (char.allowScramble ? char.current : char.target)
    }, '')
  }
}
