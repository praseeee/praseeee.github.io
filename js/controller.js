function vLoading(id_tag) {
  let loader = `
  <div class="progress">
      <div class="indeterminate"></div>
  </div>
  `;
  document.getElementById(id_tag).innerHTML = loader;
}

function vNoConnection(id) {
  document.getElementById(
    id
  ).innerHTML = `<br><br ><br ><br ><br><br> <br ><br >
  <h5 class=center-align>Tidak Ada Koneksi Internet</h5>
  <br>
  <br>`;
}

function checkConnection() {
  let isThereConnection = false;
  if (navigator.onLine) {
    isThereConnection = true;
  }
  return isThereConnection;
}

function cardBeranda(data) {
  let berandaHTML = "";
  let disabled = null;
  if (data.disabled) disabled = "disabled";
  return (berandaHTML += `
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-ligh">
                            <a href="info.html?id=${data.id}"><img src="${data.crestUrl}" width="200" height="200"></a>
                        </div>
                        <div class="card-content">
                        <a href="info.html?id=${data.id}"><span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span></a>
                            <a id="${data.id}" ${disabled} class="save waves-effect blue darken-2 btn-small"><i class="material-icons left">add_circle</i>Simpan</a>
                        </div>
                    </div>
                </div>
                `);
}

function ctrlTeamById(id) {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(base_url + "v2/teams/" + id).then(function (response) {
        if (response) {
          response.json().then(function (teamById) {
            resolve(teamById);
          });
        }
      });
    }
    getTeamById(id).then(function (teamById) {
      resolve(teamById);
    });
  });
}

function ctrlBtnSave() {
  let save = document.querySelectorAll(".save");
  let idSave = "";

  save.forEach(function (v, k) {
    save[k].onclick = function () {
      idSave = parseInt(save[k].getAttribute("id"));
      console.log(idSave);
      getById(idSave).then((res) => {
        if (res) {
          alert("Tim ini sudah disimpan");
        } else {
          ctrlTeamById(idSave).then(function (clubs) {
            saveForLater(clubs).then((data) => {
              save[k].setAttribute("disabled", "");
            });
          });
        }
      });
    };
  });
}

function ctrlBeranda() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2021/teams")
      .then(function (response) {
        if (response) {
          response
            .json()
            .then(function (teams) {
              // let teamss = teams.teams;
              // let berandaHTML = "";
              // teamss.forEach(function (team) {
              //   berandaHTML += cardBeranda(team);
              // });
              // document.getElementById("beranda").innerHTML = berandaHTML;
              // ctrlBtnSave();
              return teams.teams;
            })
            .then(function (res) {
              let dataTeamAPI = res;
              let berandaHTML = "";
              getAll()
                .then(function (data) {
                  let dataTeamDB = data;
                  dataTeamAPI.forEach(function (v, k) {
                    dataTeamDB.forEach(function (v, j) {
                      if (dataTeamAPI[k].id === dataTeamDB[j].id) {
                        dataTeamAPI[k].disabled = "disabled";
                      }
                    });
                    berandaHTML += cardBeranda(dataTeamAPI[k]);
                  });
                  return berandaHTML;
                })
                .then(function (res) {
                  document.getElementById("beranda").innerHTML = res;
                  ctrlBtnSave();
                });
            });
        }
      });
  }

  getTeams()
    .then(function (teams) {
      return teams.teams;
    })
    .then(function (res) {
      let dataTeamAPI = res;
      let berandaHTML = "";
      getAll()
        .then(function (data) {
          let dataTeamDB = data;
          dataTeamAPI.forEach(function (v, k) {
            dataTeamDB.forEach(function (v, j) {
              if (dataTeamAPI[k].id === dataTeamDB[j].id) {
                dataTeamAPI[k].disabled = "disabled";
              }
            });
            berandaHTML += cardBeranda(dataTeamAPI[k]);
          });
          return berandaHTML;
        })
        .then(function (res) {
          document.getElementById("beranda").innerHTML = res;
          ctrlBtnSave();
        });
    });
}

function tableKlasemen(data) {
  let teamsHTML = "";
  teamsHTML = `<table class="highlight"><thead>
    <tr>
      <th colspan="3">Klub</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th>GF</th>
      <th>GD</th>
      <th>GA</th>
      <th>P</th>
    </tr>
  </thead>
  <tbody>`;
  data.forEach(function (team) {
    teamsHTML += `
          <tr>
            <td>${team.position}</td>
            <td><img src="${team.team.crestUrl}" width="25" height="25" alt="logo team"/></td>
            <td>${team.team.name}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalDifference}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.points}</td>
            </tr>
      `;
  });
  teamsHTML += `
      </tbody>
      </table>
    `;
  return teamsHTML;
}

function ctrlKlasemen() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2021/standings")
      .then(function (response) {
        if (response) {
          response.json().then(function (klasemens) {
            let klasemenss = klasemens.standings[0].table;
            klasemenHTML = tableKlasemen(klasemenss);
            document.getElementById("klasemen").innerHTML = klasemenHTML;
          });
        }
      });
  }

  getKlasemen().then(function (klasemens) {
    let klasemenss = klasemens;
    klasemenHTML = tableKlasemen(klasemenss);
    document.getElementById("klasemen").innerHTML = klasemenHTML;
  });
}

function cardInfo(data) {
  return (articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${
                data.crestUrl
              }" width='350' height='350'alt='logo team'/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <ul>
                <li>Short Name : ${data.shortName}</li>
                <li>Venue : ${data.venue}</li>
                <li>Founded : ${data.founded}</li>
                <li>Club Colors : ${data.clubColors}</li>
                <li>Address : ${snarkdown(data.address)}</li>
                <li>ClubColors : ${data.clubColors}</li>
                <li>Phone : ${data.phone} </li>
                <li>Email : ${data.email}</li>
                <li>Website : ${data.website}</li>
              </ul>
            </div>
          </div>
        `);
}

function ctrlInfo() {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");

  if (isFromSaved) {
    getSavedClubById();
  } else {
    return new Promise(function (resolve, reject) {
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");

      vLoading("body-content");

      if ("caches" in window) {
        caches
          .match(base_url + "v2/teams/" + idParam)
          .then(function (response) {
            if (response) {
              response.json().then(function (teamById) {
                let infoHTML = cardInfo(teamById);

                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("body-content").innerHTML = infoHTML;
                resolve(teamById);
              });
            }
          });
      }

      getTeamById().then(function (teamById) {
        let infoHTML = cardInfo(teamById);
        document.getElementById("body-content").innerHTML = infoHTML;
      });
    });
  }
}

function cardTimFavorite(data) {
  let berandaHTML = "";
  return (berandaHTML += `
                <div class="col s12 m6 favTeam" id_team=${data.id}>
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-ligh">
                            <a href="info.html?id=${data.id}&saved=true"><img src="${data.crestUrl}" width="250" height="250"></a>
                        </div>
                        <div class="card-content">
                            <a href="info.html?id=${data.id}&saved=true"><span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span></a>
                            <a id="${data.id}" class="delete waves-effect red darken-2 btn-small">Hapus</a>
                          </div>
                    </div>
                </div>
                `);
}

function ctrlBtnHapus() {
  let delet = document.querySelectorAll(".delete");
  let cardFav = document.querySelectorAll(".favTeam");
  let id = "";
  delet.forEach(function (v, k) {
    delet[k].onclick = function () {
      id = parseInt(delet[k].getAttribute("id"));
      deleteById(id)
        .then(function () {
          cardFav[k].style.display = "none";
          ctrlTeamFavorite();
        })
        .catch(function (err) {
          return err;
        });
    };
  });
}

function ctrlTeamFavorite() {
  getAll().then(function (data) {
    let teamss = data;
    let timFavoriteHTML = "";
    timFavoriteHTML = "<h4 class=center-align>Tim Favorite Anda</h4>";
    if (teamss.length > 0) {
      teamss.forEach(function (team) {
        timFavoriteHTML += cardTimFavorite(team);
      });
      document.getElementById("timFavorite").innerHTML = timFavoriteHTML;
      ctrlBtnHapus();
    } else {
      document.getElementById(
        "timFavorite"
      ).innerHTML = `<br> <br ><br ><br ><br><br> <br ><br >
      <h5 class=center-align>Belum ada tim favorite yang dipilih</h5>
      <br>
      <br>`;
    }
  });
}

function getSavedClubById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(parseInt(idParam)).then(function (club) {
    let clubHTML = cardInfo(club);
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = clubHTML;
  });
}
