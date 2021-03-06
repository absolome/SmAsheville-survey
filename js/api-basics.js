var challonge = require('challonge')

var client = challonge.createClient({
  apiKey: 'hvA3eLb7hzOGS5py3PM3ZaGJAlRHTACaktnlobkQ'
})

var challongeApi = {}

// database.testConnection()

/* --------------------TOURNAMENTS----------------------- */

// challongeApi.indexTournaments = function(callback) {
//     client.tournaments.index({
//         callback: function(err, data){
//             if (err) { console.log(err) return }
//             callback(data)
//         }
//     })
// }

// challongeApi.showTournament = function(t_id, callback) {
//     client.tournaments.show({
//         id :    t_id,
//         callback: function(err, data){
//             if (err) { console.log(err) return }
//             callback(data)
//         }
//     })
// }

challongeApi.indexTournaments = function () {
  return new Promise(function (resolve, reject) {
    client.tournaments.index({
      callback: function (err, data) {
        if (err) { console.log(err); return ('whoops') }
        resolve(data)
      }
    })
  })
}

challongeApi.showTournament = function (t_id) {
  return new Promise(function (resolve, reject) {
    client.tournaments.show({
      id: t_id,
      callback: function (err, data) {
        if (err) { console.log(err); reject('WHOOPS') }
        resolve(data)
      }
    })
  })
}

challongeApi.startTournament = function (t_id) {
  console.log(t_id)
  client.tournaments.start({
    id: t_id,
    callback: function (err, data) {
      if (err) { console.log(err) }
      console.log('successfully strated challonge tournament: ' + t_id)
    }
  })
  console.log('making sure this works lol')
}

/* --------------------PARTICIPANTS----------------------- */

challongeApi.indexParticipants = function (t_id) {
  return new Promise(function (resolve, reject) {
    client.participants.index({
      id: t_id,
      callback: function (err, data) {
        if (err) { console.log(err); reject('WHOOPS') }
        resolve(data)
      }
    })
  })
}

challongeApi.showParticipant = function (t_id, p_id) {
  return new Promise(function (resolve, reject) {
    client.participants.show({
      id: t_id,
      participantId: p_id,
      callback: function (err, data) {
        if (err) { console.log(err); return }
        resolve(data)
      }
    })
  })
}

/* --------------------MATCHES----------------------- */

challongeApi.indexMatches = function (t_id) {
  return new Promise((resolve, reject) => {
    client.matches.index({
      id: t_id,
      callback: function (err, data) {
        if (err) { console.log(err); reject('WHOOPS') }
        resolve(data)
      }
    })
  })
}

challongeApi.showMatch = function (t_id, m_id) {
  return new Promise((resolve, reject) => {
    client.matches.show({
      id: t_id,
      matchId: m_id,
      callback: function (err, data) {
        if (err) { console.log(err); reject('WHOOPS') }
        resolve(data)
      }
    })
  })
}

module.exports = challongeApi
