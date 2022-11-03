export const capitalizeSentence = (sentence) => {
  if (!sentence) {
    return
  }

  sentence = sentence.toLowerCase().replace(/ +/g, ' ')
  let words = sentence.split(' ')

  words = words.map((word) => word.charAt(0).toUpperCase() + word.substr(1))
  words = words.join(' ')
  return words
}
