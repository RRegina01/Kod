BACKEND


1. Töltse ki megfelelően az adatbázishoz való csatlakozás adatait a backend.js fájlban.

SQL importálása (http://localhost/phpmyadmin/ 
ADATBÁZIS beimportálása (Importálás . sql-t chhose)
Tervező felületen megnézni a táblák köztti kapcsolatokat)	
-------------------
Web backend betöltése	
Csomagok frissítés VS Code-ban TERMINÁLBAN	
npm i
npm audit fix
npm i nodemon

package.json módosítása	"scripts" résznél
"start": "nodemon backend.js"     (test után egy vesszőt kell tenni:)
indítás: npm start

package.json -> "start": "nodemon backend.js":
backend.js-ben:
  function kapcsolat(){
    connection = mysql.createConnection({
      host: 'localhost', //127.0.0.1 -et is megadhatnánk mivel local és nem webszerveren
      user: 'root',
      password: '',
      database: 'kelettravel2024'
    })

POSTMAN: get:
http://localhost:3000/celok → SEND
----------------------------------------------------------------------------------------------------------------------------------------------------------------
2.-5. Készítsen végpontot az adatbázis  kapcsolatfelvetel táblájának bővítésére,
a végpont kezelje a beérkező adatokat,
az összes bemenő adatot jól kezelje,
és kimenete a Hiba vagy Sikeres felvitel szöveg legyen.
"app.use(express.urlencoded( { extended: true } ));  //backend.js elejében valahova megadni ezt

PHPmyAdmin, tábla beszúrás: SQL előnézete, copy

""app.post('/kapcsolatok', (req, res) => {
  const { nev, email, telefon, megjegyzes} = req.body;
  //console.log(nev, email, telefon, megjegyzes);

  kapcsolat();
  connection.query('INSERT INTO `kapcsolatfelvetel` (id, nev, email, telefon, megjegyzes) VALUES (NULL, ?, ?, ?, ?)', [nev, email, telefon, megjegyzes], (err, result) => {
    if (err) {
      return res.status(500).json('Hiba');
    }

    res.status(200).json('Sikeres felvitel');
    connection.end()
  });
});""


POSTMAN:
post
http://localhost:3000/kapcsolatok
alul:
Headers fülön:
content type → value: application/json

Body:
x-www…
"
-----------------------------------------------------------------------------------
6.-9. Új végpont létrehozása a "celok" táblán belüli kereséshez, (megadott kulcsszó alapján keressen az utazási célok nevében, részkifejezésre, frontenden, Weblapon van keresés úticélra)
a keresés végpont kezelje a beérkező adatokat,
jól keressen csak egy szórészletre,
és kimenete a talált adatsor legyen.

"app.post('/celok', (req, res) => {
  const searching = req.body.searching;
  //console.log(searching);

  kapcsolat();
  connection.query('SELECT * FROM celok WHERE celok_nev LIKE ?', [`%${searching}%`], (err, result) => {
    if (err) {
      return res.status(500).json('Hiba');
    }

    res.status(200).json(result);
    connection.end();
  });
});
----
'http://localhost:3000/celok'

POST
HEADERS: contenct type application/json

searching value: bármi"

---------------------------------------------------------------------------------
10-13
Készítsen végpontot a kapcsolatfelvetel tábla egy rekordjának törlésére,
bemenő adat a törlendő rekord kapcsolat id-ja legyen,
a törlés parancsát jól alkalmazza,
és kimenete a Hiba vagy Sikeres törlés szöveg legyen.

"app.delete('/kapcsolatok/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id);

  kapcsolat();

  connection.query('DELETE FROM kapcsolatfelvetel WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json('Hiba');
    }

    res.status(200).json('Sikeres törlés');
    connection.end();
  })
});

postman:
delete  http://localhost:3000/kapcsolatok/23"

-------------------------------------------------------------
14-15
Tesztelje Postmanben a kapcsolatfelvitel funkciót, készítsen az eredményességről képernyőképet,
majd tesztelje a törlés funkciót, eredményességről készüljön képernyőkép!
"http://localhost:3001/kapcsolatok
Headers: Content-Type, application/json
Body: x-www-form-urlencoded
nev: Teszt Elek
email: teszt@teszt.hu
telefon: 123456789
megjegyzes: minden mehet

Ami volt ugyan azzal és SEND→ adatbázisba is bekerült az adat"

-------------------------
VÁRHATÓ:
WEB Backend lekérdezés 2 táblából. 
GET
pl.: SELECT * FROM celok JOIN orszag ON celok.celok_orszag = orszag.orszag_id;
-----------------------------------------------

2.	HTML+CSS+Bootstrap (reszponzív)

41	A bg-secondary osztályok cseréje bg-primary-re	index.html-ben CTRL+H  replace (Csere): bg-secondary -> bg-primary
42	Szolgáltalásokon belül 2 oszlopos helyett 3 oszolopos elrendezés, a 3. elem a  szolg3.jpg képpel, 	"""col-md-6"" -> ""col-md-4""
Lemásoltuk a Szolgáltatáselemkből még egyszer és ezt átírtuk benne és a képek nevét írtam át meg a szöveget a segít TXT ből

----
index.html-ben CTRL F rákeresés: Szolgáltatások
Tehát csak 12 oszlop fér el egy div-be
	Tehát ha 2 kép van akkor a <div class=""col-md-6""> 
Ha 3 akkor  <div class=""col-md-4"">"


43	melyen kattintva modális ablak jelenjen meg, a képpel és seged.txt-ben található szöveggel, Utas biztosítás címmel.	"Szolgáltatások felugró kártyái .. Repjegy, utazás szervezés és az utazásszervezést telljes egészében lemásolta, szolgaltatas modal2 --> átírta 3-ra
kepet az img-t átírta szolg 2 --> szolg 3
segéb txt karakterkódolás esetleg notepad ++ ban lehet javítani, átkonvertélin encoding convert to utf 8 

<!-- 43. Utasbiztosítás -->
 <div class=""szolgaltatasok-modal modal fade"" id=""szolgaltatasokModal3"" tabindex=""-1"" role=""dialog""
 aria-hidden=""true"">
 <div class=""modal-dialog modal-xl"" role=""document"">
     <div class=""modal-content"">
         <button class=""close"" type=""button"" data-dismiss=""modal"" aria-label=""Close"">
             <span aria-hidden=""true""><i class=""fas fa-times""></i></span>
         </button>
         <div class=""modal-body"">
             <div class=""container"">
                 <div class=""row justify-content-center"">
                     <div class=""col-lg-8"">


                         <h2 class=""szolgaltatasok-modal-title text-dark text-uppercase text-center mb-0"">
                             Utazás szervezés
                         </h2>


                         <div class=""divider-custom"">
                             <div class=""divider-custom-line""></div>
                             <div class=""divider-custom-icon""><i class=""fas fa-star""></i></div>
                             <div class=""divider-custom-line""></div>
                         </div>


                         <div class=""row justify-content-center"">
                             <img class=""img-fluid rounded mb-5"" src=""assets/img/szolgaltatasok/szolg3.jpg""
                                 alt=""sz2"" />
                         </div>


                         <p>
                            Biztonságosan szeretne utazni?
                            Megkötjük önnek az utas biztosítást!
                            Elhagyta útlevelét?
                            Megbetegedett?
                            Az utasbiztosításban megkötöttek alapján szervezzük az ügyeket!
                         </p>
                         <button class=""btn btn-primary"" data-dismiss=""modal"">
                             <i class=""fas fa-times fa-fw""></i>
                             Bezár
                         </button>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
</div>"

44	Új menüpont, Keresés menüpont, menüben való kattintásra gördítsen le a Weblapon,	"//Ahol van a többi ilyen fejléc (navbar) mint pl szolgáltatáosok, azt le kell másolni és ott beírni amit kér:
 <li class=""nav-item""><a class=""nav-link rounded js-scroll-trigger"" href=""#keresendo"">Keresés</a>
                    </li>"

45 Keresés szekció létrehozása (Úti célok szekció mintájára) ,	"//itt a fejlécet lemásoltuk és abban placeholder csere
Uticélok szekció lemásolása
----

 <section class=""page-section bg-dark text-white mb-0"" id=""kereses"">
        <div class=""container"">
            <!--EZT MÁSOLTUK AZ ÜZNETEKÜLDÉSBŐL, EZ EGY INPUT (BEVITELI MEZŐ) ÉS A GOMB-->
            <div class=""control-group"">
                <div class=""form-group floating-label-form-group controls mb-0 pb-2"">
                    <input class=""form-control"" id=""keresendo"" type=""text"" placeholder=""Írja be a keresendő úticélt!"" />
                </div>
            </div>

            <!--<br />--> <!--EZ KISZEDI MERT EZ EGY HÉZADOT TESZ-->
            <div class=""form-group"">
                <button class=""btn btn-primary btn-xl"" id=""searchingButton"" type=""button"" onclick=""kereses()"">Keresés
                </button>

            </div>
            <!--EDDIG LETT MÁSOLVA-->
            <div class=""divider-custom divider-light"">
                <div class=""divider-custom-line""></div>
                <div class=""divider-custom-icon""><i class=""fas fa-star""></i></div>
                <div class=""divider-custom-line""></div>
            </div>

            <!--47 KERESÉS +++   60-65 -->
            <div class=""row"">
                <div class=""col-12"" id=""talalat"">
                        
                </div>

            </div>

        </div>
    </section>"

    

46	benne beviteli mező ('keresendo' azonosítóval) és gomb (hasonlóan, mint lent Üzenet küldése gomb), kattintásra 'kereses' függvény, 	"id=""kereses"" 
id=""keresendo"" 
id=""searchingButton"" 
type=""button"" onclick=""kereses()"""


47	alatta új keret, teljes szélességgel, "talalat" azonosítóval (találatoknak) .	"            <div class=""row"">
                <div class=""col-12"" id=""talalat"">
            </div>"

48	Üzenet küldése gombra "kapcsolat" függvény meghívása, alatta keret, "siker" azonosítóval,	"type=""button"" onclick=""kapcsolat()"" 

    </form>  alá külön egy div
           <div id=""siker""></div>

----
<!--48 ki kellett keresni az üzenet küldését és onlclick rész került bele-->
                        <div class=""form-group"">
                            <button class=""btn btn-primary btn-xl"" id=""sendMessageButton"" type=""button"" onclick=""kapcsolat()"">Üzenet küldése
                            </button>"

49	mely 20px szöveg méretű, félkövér, felső margója 10px-es (stíluslapon).	"stilus.css fájlban: 
#siker {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
}"


50	Alul, Kapcsolat részben 4. elem az "Úti cél, vagy egyéb megjegyzés" 2 soros beviteli szöveg legyen, "message" azonosítóval.	"<textarea name=""mesage"" id=""message"" cols=""63"" rows=""2"" placeholder=""Úti cél, vagy egyéb megjegyzés""></textarea>

control group lemásolása

<!--50-->
        <div class=""control-group"">
          <div class=""form-group floating-label-form-group controls mb-0 pb-2"">
            <textarea name=""message"" id=""message"" cols=""63"" rows=""2""
             placeholder=""Úti cél, vagy egyéb megjegyzés""></textarea>
       </div>
   </div>"
---------------------------------------------------------------------------
3. FRONTEND


51 Oldja meg, hogy a kapcsolatfelvétel szekcióban "Úti cél vagy egyéb megjegyzés" részbe írt szöveg bekerüljön az adatbázisba, ehhez a "kapcsolat" függvényt módosítsa az alap.js-ben,	"function kapcsolat () {} en belülre még egy ilyeen:

var bemenet={
       // bevitel1:document.getElementById(""name"").value,
       // bevitel2:document.getElementById(""email"").value,
       // bevitel3:document.getElementById(""phone"").value
       nev:document.getElementById(""name"").value,
       email:document.getElementById(""email"").value,
       telefon:document.getElementById(""phone"").value,
       megjegyzes: document.getElementById(""message"").value
       
    }"

-------------------------
52	továbbá,  a fetch parancsban a method és body mezőt megfelelően állítsa be,	"    ffunction kapcsoaltok () függvényel belül:

// itt a felvitel helyett a kapcsolatokat írtuk  be mert backendbe azt adtuk meg
    fetch(""http://localhost:3000/kapcsolatok"", {
        method: ""POST"", // mivel a backendben ez egy post method volt (app.post('kapcsolatok', (req,res)=> {)
        body: JSON.stringify(bemenet),
        headers: { ""Content-type"": ""application/json; charset=UTF-8"" }
    }


    )
        .then(x => x.text())
        .then(y => {
            alert(y);


        });"


53	és a "siker" azonítójú keretbe írja a Backendről vissszatérési értékként megkapott "A felvitel sikerült." szöveget.	"//53 ez a functionono belül
        .then(x => x.text())
        .then(y => {
            // alert(y);
            document.getElementById(""siker"").innerHTML = y;
        });"

54	Oldja meg, hogy  a 'célok' megjelenjenek a  Weblap 'Úti célok' szekciójában, a Backend végpont megfelelő hívásával, 	"index.html -> 

<body id=""page-top"" onload=""uticelok()"">"


55	 a visszatérő adatokat-úticélokat, json-ban kezelje, rakja keretekbe, 
56	a keretek osztálya "col-lg-4"  és a "ml-auto" osztályok legyenek,
57	a keretbe a képet helyezze el (jó eléréssel, reszponzív képméretezéssel),
58	a keretbe illesszen bekezdést, mely osztálya "alairas", legyen benne a cél neve
59	és a célok képei, illetve a célok nevei, a megfelelő helyen jelenjenek meg a Weblapon, "celok" azonosítójú keretben, a minta szerint.


"alap.js:
async function uticelok() {
    const res = await fetch(""http://localhost:3000/celok"");
    const celok = await res.json();
    console.log(celok);

    let celokHTML = """";
    for (const cel of celok) {
        celokHTML += `
        <div class=""col-lg-4 ml-auto"">
            <img src=""kepek/${cel.celok_kep}"" alt=""${cel.celok_neve}"" class=""img-fluid"">
            <p class=""alairas"">${cel.celok_nev}</p>
        </div>
        `;
    }
    document.getElementById(""celok"").innerHTML = celokHTML;
}

---backend. jsbe:
const path =require('path');//54-59
const kepekPath = path.join(__dirname, 'kepek'); //54-59
app.use('/kepek',express.static(kepekPath)); //54-59"


----------------------------

60	Oldja meg, hogy a Keresés szekcióban lehessen keresni az úti cél nevében, ehhez hozzon létre "kereses" függvényt, mely a keresésre írt Backend végpontot hívja meg,
61	a "keresendo" azonosítójú beviteli mezőbe írt szöveget átküldi a Backend végpontnak,
62	és a keresés eredményét, számozatlan felsorolásba helyezi,
63	minden listaelemre beállítja a "lista" osztályt, berakja a 100px szélességű képet és
64	a "kephez" osztályú szöveges mezőbe rakja az úti cél nevét,
65	és a keresés eredménye megjelenik a Weblapon a "talalat" azonosítójú keretben, a minta szerint.


"async function kereses() {
    const searching = document.getElementById('keresendo').value;

    const res = await fetch('http://localhost:3000/celok', {
        method: ""POST"",
        headers: { ""Content-type"": ""application/json; charset=UTF-8"" },
        body: JSON.stringify({ searching })
    });
    const adatok = await res.json();

    let keresesHTML = ""ul"";
    for (const adat of adatok) {
        keresesHTML += `
                 <li class=""lista"">
                     <img src=""kepek/${adat.celok_kep}"" alt=""${adat.celok_nev}"" style=""width: 100px;"">
                     <span class=""kephez"">${adat.celok_nev}</span>
                 </li>
             `;
    }
    keresesHTML += ""</ul>"";
    document.getElementById(""talalat"").innerHTML = keresesHTML;
}"



----------------------------------------


4.	Konzolos C#

16	Osztály létrehozása a "célok" tábla összes mezőjére (karakterhelyesen)	"New projekt (c# windows console)
Console App (.Net Framework)
Place solution and project in the same directory legyen bepipálva

Project jobb egér gomb Add item/Class/Celok.cs
public class Celok

prop tab tab

     
public  class Celok
    {
        // public int MyProperty { get; set; } -tulajdonság/property
        public int celok_id { get; set; }
        public string celok_nev { get; set; }
        public string celok_kep { get; set; }
        public string celok_kultura_honap { get; set; }
        public int celok_orszag { get; set; }
    }


17	Osztály létrehozása a "kapcsolatfelvetel" tábla összes mezőjére (karakterhelyesen)	"    public class Kapcsolatfelvetel
    {
        public int id { get; set; }
        public string nev { get; set; }
        public string email { get; set; }
        public string telefon { get; set; }
        public string megjegyzes { get; set; }
    }"

18	"Celok" osztály bővítése új metódussal (KetSzo néven), melynek visszatérési értéke igaz logikai érték, ha a cél neve két szóból áll, egyébként hamis	" public bool KetSzo()
	{            
	string[] tmp = celok_nev.Split();
            if (tmp.Length > 1)
            {
                return true;
            }
            else
            {
                return false;
            }
VAGY

        public bool KetSzo()
        {
            return celok_nev.Contains("" "");
        }"


19	"Kapcsolat" osztály bővítése új tulajdonsággal(property) (Hianyos néven), mely értéke igaz logikai érték, ha a név, email vagy telefon bármelyike üres, egyébként hamis	"        public bool Hianyos
        {
            get
            {
                if (nev == """" || email == """" || telefon == """")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }"


20	Célok letárolása az adatbázis táblájából, listába, felhasználva a "Celok" osztályt (NewtonSoft.Json és NetworkHelper dll-ek beimportálása)	"Jobb oldalon, References/Add reference -->Browse és ami van 2
két dll-t adjuk hozzá

Program.cs
using NetworkHelper;  beszúrása

namespace KeletTravelKonzolos
{
    class Program
    {
        static string host = ""http://localhost:3000"";
        static List<Celok> celokLista = Backend.GET($""{host}/celok"").Send().ToList<Celok>();
        static void Main(string[] args)
        {
            
            Console.ReadKey();
        }
    }
}"


21	Úticélok darabszámának kiírása (1.feladat)	"// 1. feladat
Console.WriteLine($""1. feladat: Az elérhető célok száma: {celokLista.Count()}"");"

22	Azon úticélok nevének kiíratása, amelyek nem kétszavasok, KetSzo függvény használata. (2.feladat)	"// 2. feladat
Console.WriteLine(""2. feladat: Egyszavas célok:"");
celokLista.Where(x => x.KetSzo() == false).ToList().ForEach(x => Console.WriteLine(x.celok_nev));"

23	Egy keresendő szó bekérése (3.feladat),	"// 3. feladat
Console.Write(""3. feladat: Adj meg egy keresendő szót: "");
string keresendo = Console.ReadLine();"

24	majd a keresett szó megkeresése az úti cél nevében, cél nevének és a hónap kiírása, amikor a legtöbb kultúrális esemény zajlik ,	"            // 3. feladat
25	találatok számának is kiírása képernyőre,	
            Console.Write(""3. feladat: Adj meg egy keresendő szót: "");
            string keresendo = Console.ReadLine();

            var talalat = celokLista.Where(x => x.celok_nev.Contains(keresendo)).Select(x => $""{x.celok_nev} {x.celok_kultura_honap}"").ToList();
            Console.WriteLine(""Találatok:"");
            talalat.ForEach(x => Console.WriteLine(x));
            Console.WriteLine($""Találatok száma: {talalat.Count()}"");"

26	a keresés eredménye fájlba is legyen kiírva, fájl neve a beért szó pl. sziget.txt fájlba,	"            // fájlba írás
27	ugyanaz legyen fájlban, mint a képernyőn: a talált úticélok neve (hónap) és alatta a találatok száma.	
            var tartalom = talalat.Prepend(""Talalatok: "").Append($""Találatok száma: {talalat.Count()}"");
            File.WriteAllLines($""{keresendo}.txt"", tartalom);

using System.IO; // ez is kell a 26. oshoz"

28	A kultúra hónapja szerinti csoportosításban hány (darab) úti cél van (4.feladat),	"            // 4. feladat
29	rendezés darabszám szerint csökkenően,	
30	majd hónap és darabszám kiíratása képernyőre.	

            Console.WriteLine(""4. feladat"");
            celokLista.GroupBy(x => x.celok_kultura_honap).Select(x => new
            {
                honap = x.Key,
                db = x.Count()
            }).OrderByDescending(x => x.db).ToList().ForEach(x => Console.WriteLine($""{x.honap}: {x.db}""));

            Console.ReadKey();"
--------------------------
5.	Grafikus C#

   
31	A projecten belül új WPF megnyitása, és Consolos program elérése, minden class nyilvánossá tétele (NewtonSoft.Json és NetworkHelper dll-ek beimportálása)	"Solution jobb egér gomb:
Add new project: WPF App (.Net framework)

A mostani konzolos Project/References/ Add references: 2 dll (amit már korábban is hozzáadtunk)

using NetworkHelper;  -ezt beírni ezt a MainWindows.xaml.cs -be

Project/Add Existing item.../  megkeressük a Konzolosból az osztályokat (kapcsolatfelvétel és célok.cs)  és Add As Link

using KeletTravelKonzolos; ezt a MainWindows.xaml.cs -be"


"<Window x:Class=""KeletTravelGrafikus.MainWindow""
        xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation""
        xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml""
        xmlns:d=""http://schemas.microsoft.com/expression/blend/2008""
        xmlns:mc=""http://schemas.openxmlformats.org/markup-compatibility/2006""
        xmlns:local=""clr-namespace:KeletTravelGrafikus""
        mc:Ignorable=""d""
        Title=""KeletTravel"" Height=""450"" Width=""800"">
    
    <TabControl>
        <TabItem Header=""Úticélok"">
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width=""*""/>
                    <ColumnDefinition Width=""*""/>
                </Grid.ColumnDefinitions>
                <ListBox x:Name=""lbCelok"" Grid.Column=""0""/>
                <StackPanel Grid.Column=""1"">
                    <Label Content=""Cél megnevezése""/>
                    <Label Content="""" x:Name =""lblCelNev""/>
                    <Label Content=""Kultúrális események jellemző hónapja""/>
                    <Label Content="""" x:Name =""lblCelHonap""/>
                </StackPanel>
            </Grid>
        </TabItem>

        <TabItem Header=""Kapcsolatfelvétel"">
            <StackPanel>
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width=""100""/>
                        <ColumnDefinition Width=""*""/>
                    </Grid.ColumnDefinitions>
                    <Label Content=""Név:"" Grid.Column=""0""/>
                    <TextBox x:Name=""tbNev"" Grid.Column=""1""/>
                </Grid>
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width=""100""/>
                        <ColumnDefinition Width=""*""/>
                    </Grid.ColumnDefinitions>
                    <Label Content=""Email:"" Grid.Column=""0""/>
                    <TextBox x:Name=""tbEmail"" Grid.Column=""1""/>
                </Grid>
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width=""100""/>
                        <ColumnDefinition Width=""*""/>
                    </Grid.ColumnDefinitions>
                    <Label Content=""Telefon:"" Grid.Column=""0""/>
                    <TextBox x:Name=""tbTelefon"" Grid.Column=""1""/>
                </Grid>
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width=""100""/>
                        <ColumnDefinition Width=""*""/>
                    </Grid.ColumnDefinitions>
                    <Label Content=""Megjegyzés:"" Grid.Column=""0""/>
                    <TextBox x:Name=""tbMegjegyzes"" Grid.Column=""1""/>
                </Grid>

                <Button x:Name=""btnFelvetel"" Content=""Kapcsolatfelvétel"" Height=""25""/>

            </StackPanel>
        </TabItem>
    </TabControl>
    
</Window>"
--------------------
32	Tabcontrol 1. fülén belül Listbox-ban, jelenjenek meg az úticélok nevei
33	hívja meg hozzá a szükséges Backend végpontot,


"  //  mainwindow.xaml.cs:

public partial class MainWindow : Window
    {
        string host = ""http://localhost:3000"";
        public MainWindow()
        {
            InitializeComponent();
            lbCelok.ItemsSource = Backend.GET($""{host}/celok"").Send().ToList<Celok>();
            lbCelok.DisplayMemberPath = ""celok_nev"";
        }
    }"


34	ha a listbox elemeire kattintunk,
35	mellette jelenjen meg az úti cél neve és látogatáshoz ideális hónap.

"        //itt dupla kliekkeltem a vizuális felületen 
private void lbCelok_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Celok cel = lbCelok.SelectedItem as Celok;
            lblCelNev.Content = cel.celok_nev;
            lblCelHonap.Content = cel.celok_kultura_honap;
        }"


36	A Tabcontrol 2. fülén készítsen kapcsolatfelvételhez űrlapot,
37	gombnyomásra vigye fel az adatokat az adatbázis kapcsolatfelvetel táblájába
38	a felvitelt, a szükséges Backend végpont hívásával oldja meg,
39	minden szükséges adatot küldjön át a végpontnak,
40	ha a név mező üres, ne vigyen fel adatot, hibaüzenetet adjon.


"     //kapcsolatfelvétel gombra dupla katt

   private void btnFelvetel_Click(object sender, RoutedEventArgs e)
        {
            Kapcsolatfelvetel adatok = new Kapcsolatfelvetel() 
            {
                nev = tbNev.Text,
                email = tbEmail.Text,
                telefon = tbTelefon.Text,
                megjegyzes = tbMegjegyzes.Text
            };

            if (adatok.Hianyos)
            {
                MessageBox.Show(""Minden mező kitöltése kötlező!"");
            }
            else
            {
                string uzenet = Backend.POST($""{host}/kapcsolatok"").Body(adatok).Send().Message;
                MessageBox.Show(uzenet);
            }}"











