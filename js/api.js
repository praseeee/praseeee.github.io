const base_url = "https://api.football-data.org/";

const api_token = "6eabea1db8904edb959c79aecde6c1a8";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function setFetch(url) {
  return fetch(base_url + url, {
    headers: {
      "X-Auth-Token": api_token,
    },
  });
}

// Blok kode untuk melakukan request data json
function getKlasemen() {
  return setFetch("v2/competitions/2021/standings")
    .then(status)
    .then(json)
    .then(function (data) {
      return data.standings[0].table;
    })
    .catch(error);
}

function getTeams() {
  return setFetch("v2/competitions/2021/teams")
    .then(status)
    .then(json)
    .then(function (teams) {
      return teams;
    })
    .catch(error);
}

function getTeamById(idParam = null) {
  let urlParams = new URLSearchParams(window.location.search);
  if (idParam == null) idParam = urlParams.get("id");
  return setFetch("v2/teams/" + idParam)
    .then(status)
    .then(json)
    .then(function (teamById) {
      return teamById;
    })
    .catch(error);
}

function fil(arr, id) {
  let flag = null;
  arr.forEach(function (data) {
    if (data.id === id) {
      flag = data.flag;
    }
  });
  return flag;
}

function getC() {
  caches
    .match(
      base_url +
        "v2/competitions/2021/matches?dateFrom=2020-06-09&dateTo=2020-06-23"
    )
    .then(function (response) {
      if (response) {
        response
          .json()
          .then(function (data) {
            let matchx = [];
            let matches = null;
            matches = data.matches;
            matches.forEach(function (match) {
              matchx.push({
                homeTeamId: match.homeTeam.id,
                homeTeamName: match.homeTeam.name,
                awayTeamId: match.awayTeam.id,
                awayTeamName: match.awayTeam.name,
                scoreHome: match.score.fullTime.homeTeam,
                scoreAway: match.score.fullTime.awayTeam,
                utcDate: match.utcDate,
              });
            });
            return matchx;
          })
          .then(function (matches) {
            caches
              .match(base_url + "v2/competitions/2021/teams")
              .then(function (response) {
                if (response) {
                  response.json().then(function (data) {
                    let matchHtml = "";
                    let flag = [];
                    let teams = null;
                    teams = data.teams;
                    teams.forEach(function (team) {
                      flag.push({ id: team.id, flag: team.crestUrl });
                    });

                    matches.forEach(function (match) {
                      matchHtml += `
                      <div class="col s12 m6">
                        <div class="card">
                          <div class="card-content">
                            <table class='centered'">
                            <tr>
                              <td><img width='30' height='30' src='${fil(
                                flag,
                                match.homeTeamId
                              )}'/>
                              </td>
                              <td>
                                ${match.homeTeamName}
                              </td>
                              <td>${match.scoreHome}</td>
                            </tr>
                            <tr>
                              <td><img width='30' height='30' src='${fil(
                                flag,
                                match.awayTeamId
                              )}'/></td>
                              <td>${match.awayTeamName}</td>
                              <td>${match.scoreAway}</td>
                            </tr>
                            <tr>
                              <td colspan='3'>${time(match.utcDate)}</td>
                            </tr>            
                            </table>
                            </div>
                          </div>
                        </div>
                            `;
                    });
                    document.getElementById("matches").innerHTML = matchHtml;
                  });
                }
              });
          });
      }
    });
}

function getMatch() {
  if ("caches" in window) {
    getC();
  }

  getMatchTeams().then(function (data) {
    let contentMatchHTML = `<h4 class="flow-text center-align">Jadwal Pertandingan Liga Inggris</h4>
    <div class="row" id="matches">
    <div class="progress">
    <div class="indeterminate"></div>
    </div>
    </div>
    `;
    let match = data[0];
    let teams = data[1];
    let matchHtml = "";
    match.forEach(function (match) {
      matchHtml += `
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content">
              <table class='centered'">
                <tr>
                  <td><img width='30' height='30' src='${fil(
                    teams,
                    match.homeTeamId
                  )}'/> </td>
                  <td>
                  ${match.homeTeamName}
                  </td>
                  <td>${match.scoreHome}</td>
                </tr>
                <tr>
                <td><img width='30' height='30' src='${fil(
                  teams,
                  match.awayTeamId
                )}'/></td>

                  <td>${match.awayTeamName}</td>
                  <td>${match.scoreAway}</td>
                </tr>
                <tr>
                  <td colspan='3'>${time(match.utcDate)}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        `;
    });
    document.getElementById("matches").innerHTML = matchHtml;
  });
}

function getMatchTeams() {
  return (data = Promise.all([
    setFetch(
      "v2/competitions/2021/matches?dateFrom=2020-06-09&dateTo=2020-06-23"
    )
      .then(status)
      .then(json)
      .then(function (data) {
        let matchx = [];
        let matches = null;
        matches = data.matches;
        matches.forEach(function (match) {
          matchx.push({
            homeTeamId: match.homeTeam.id,
            homeTeamName: match.homeTeam.name,
            awayTeamId: match.awayTeam.id,
            awayTeamName: match.awayTeam.name,
            scoreHome: match.score.fullTime.homeTeam,
            scoreAway: match.score.fullTime.awayTeam,
            utcDate: match.utcDate,
          });
        });
        return matchx;
      }),
    setFetch("v2/competitions/2021/teams")
      .then(status)
      .then(json)
      .then(function (data) {
        let flag = [];
        let teams = null;
        teams = data.teams;
        teams.forEach(function (team) {
          flag.push({ id: team.id, flag: team.crestUrl });
        });
        return flag;
      }),
  ]));
}

function time(time) {
  let hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  let date = new Date(time);
  let _hari = date.getDay();
  let _tgl = date.getDate();
  let _bulan = date.getMonth();
  let _thn = date.getFullYear();

  let hari_x = hari[_hari];

  return `${hari_x},${_tgl}/${_bulan + 1}/${_thn}`;
}
