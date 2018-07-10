const charField = document.querySelector('input[name=charField]')
const charSubmit = document.querySelector('button[name=charSubmit]')
const charName = document.querySelector('#charName')
const charTitle = document.querySelector('#charTitle')
const charSpouse = document.querySelector('#charSpouse')
const houseField = document.querySelector('input[name=houseField]')
const houseSubmit = document.querySelector('button[name=houseSubmit]')
const houseName = document.querySelector('#houseName')
const houseRegion = document.querySelector('#houseRegion')
const houseLeader = document.querySelector('#houseLeader')
const houseHeir = document.querySelector('#houseHeir')

charSubmit.addEventListener('click', e => {
  e.preventDefault()
  axios.get(`https://anapioficeandfire.com/api/characters/${charField.value}`)
    .then(response => {
      const data = response.data
      charName.textContent = `Name: ${data.name}`
      charTitle.textContent = `Titles: ${data.titles}`

      axios.get(data.spouse)
        .then(response2 => {
          charSpouse.innerHTML = `Spouse: <a href=''>${response2.data.name}<a>`
        })
    })
})

houseSubmit.addEventListener('click', e => {
  e.preventDefault()
  axios.get(`https://anapioficeandfire.com/api/houses/${houseField.value}`)
    .then(response => {
      const data = response.data
      houseName.textContent = `House Name: ${data.name}`
      houseRegion.textContent = `Region: ${data.region}`
      axios.get(data.currentLord)
        .then(response2 => {
          houseLeader.textContent = `Current Leader: ${response2.data.name}`
        })
      axios.get(data.heir)
        .then(response2 => {
          houseHeir.textContent = `Heir: ${response2.data.name}`
        })
    })
})
