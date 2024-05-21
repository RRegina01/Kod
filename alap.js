

//54-59
async function uticelok() {
    const res = await fetch("http://localhost:3000/celok");
    const celok = await res.json();

    console.log(celok);

    let celokHTML = "";
    for (const cel of celok) {
        celokHTML += `
         <div class="col-lg-4 ml-auto">
             <img src="http://localhost:3000/kepek/${cel.celok_kep}" alt="${cel.celok_nev}" class="img-fluid">
             <p class="alairas">${cel.celok_nev}</p>
        </div>`
            ;
    }

    document.getElementById("celok").innerHTML = celokHTML;
}






function kapcsolat() {

    var bemenet = {
        // bevitel1:document.getElementById("name").value,
        // bevitel2:document.getElementById("email").value,
        // bevitel3:document.getElementById("phone").value
        nev: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("phone").value,
        megjegyzes: document.getElementById("message").value

    }

    // itt a felvitel helyett a kapcsolatokat írtuk  be mert backendbe azt adtuk meg
    fetch("http://localhost:3000/kapcsolatok", {
        method: "POST", // mivel a backendben ez egy post method volt (app.post('kapcsolatok', (req,res)=> {)
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    ) //53
        .then(x => x.text())
        .then(y => {
            // alert(y);
            document.getElementById("siker").innerHTML = y;
        });


}


//60-65

function kereses() {
    const searching = document.getElementById('keresendo').value;
    console.log(searching);

    fetch("http://localhost:3000/celok", {
        method: "POST",
        headers: {
            "Ccontent-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ searching })

    })
        .then(x => x.json())
        .then(adatok => {
            console.log(adatok);

            let keresesHTML = "<ul>";
            for (const adatok of adatok) {
                keresesHTML += `
                  <li class="lista">
                        <img src="http://localhost:3000/kepek/${adat.celok_kep}" alt="${adat.celok_nev}" style = "width:100px;"> 
                       <span class="kephez">${adat.celok_nev}</span>
                 </li>`
            }
            keresesHTML += "</ul;"
            document.getElementById("talalat").innerHTML =keresesHTML;
        })
    
    
}







var counter = 0;
szamlaloStart();

function szamlaloStart() {
    setInterval(() => {
        counter++;
        var szamlaloSzoveg = document.getElementById('szamlalo');
        szamlaloSzoveg.textContent = counter;
    },
        500, window
    );
}


