const field = document.querySelector('input[name=field]')
const search = document.querySelector('button[name=search]')
const type = document.querySelector('select[name=type]')
const charName = document.querySelector('#charName')
const charTitle = document.querySelector('#charTitle')
const charSpouse = document.querySelector('#charSpouse')
const houseName = document.querySelector('#houseName')
const houseRegion = document.querySelector('#houseRegion')
const houseLeader = document.querySelector('#houseLeader')
const houseHeir = document.querySelector('#houseHeir')

let leaderHolder = ''
let heirHolder = ''
let spouseHolder = ''

const updateChar = (link) => {
  event.preventDefault()
  axios.get(link)
    .then(response => {
      const data = response.data
      charName.innerHTML = `Name: ${data.name}`
      charTitle.innerHTML = `Titles: ${data.titles}`
      spouseHolder = data.spouse
      axios.get(data.spouse)
        .then(response2 => {
          charSpouse.innerHTML = `Spouse: <a href='' onclick='updateChar(spouseHolder)'>${response2.data.name}<a>`
        })
    })

}

const charLoad = () => {
  axios.get(`https://anapioficeandfire.com/api/characters/${field.value}`)
    .then(response => {
      const data = response.data
      charName.innerHTML = `Name: ${data.name}`
      charTitle.innerHTML = `Titles: ${data.titles}`
      axios.get(data.spouse)
        .then(response2 => {
          charSpouse.innerHTML = `Spouse: <a href='' onclick='updateChar(spouseHolder)'>${response2.data.name}<a>`
        })
    })
}

const houseLoad = () => {
  axios.get(`https://anapioficeandfire.com/api/houses/${field.value}`)
    .then(response => {
      const data = response.data
      houseName.innerHTML = `House Name: ${data.name}`
      houseRegion.innerHTML = `Region: ${data.region}`
      leaderHolder = data.currentLord
      axios.get(data.currentLord)
        .then(response2 => {
          houseLeader.innerHTML = `Current Leader: <a href='' onclick='updateChar(leaderHolder)'>${response2.data.name}</a>`
        })
      heirHolder = data.heir
      axios.get(data.heir)
        .then(response2 => {
          houseHeir.innerHTML = `Heir: <a href='' onclick='updateChar(heirHolder)'>${response2.data.name}</a>`
        })
    })
}

search.addEventListener('click', e => {
  e.preventDefault()
  type.value === 'house' ? houseLoad() : charLoad()
})
