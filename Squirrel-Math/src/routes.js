
import Home from './components/content/Home'
import HomeShort from './components/content/HomeShort'
import Editor from './components/Editor'
import Tree from './components/content/Tree'
import DrzewoHD from './components/content/DrzewoHD'
import Wprowadzenie from './components/content/Wprowadzenie'
import Liczba from './components/content/lessons/Liczba/Liczba'
import LiczbaShort from './components/content/lessons/Liczba/LiczbaShort'
import Dodawanie from './components/content/lessons/Dodawanie/Dodawanie'
import DodawanieShort from './components/content/lessons/Dodawanie/DodawanieShort'
import Odejmowanie from './components/content/lessons/Odejmowanie/Odejmowanie'
import OdejmowanieShort from './components/content/lessons/Odejmowanie/OdejmowanieShort'
import Mnozenie from './components/content/lessons/Mnozenie/Mnozenie'
import MnozenieShort from './components/content/lessons/Mnozenie/MnozenieShort'
import Dzielenie from './components/content/lessons/Dzielenie/Dzielenie'
import DzielenieShort from './components/content/lessons/Dzielenie/DzielenieShort'
import KolejnoscWykonywaniaDzialan from './components/content/lessons/KolejnoscWykonywaniaDzialan/KolejnoscWykonywaniaDzialan'
import KolejnoscWykonywaniaDzialanShort from './components/content/lessons/KolejnoscWykonywaniaDzialan/KolejnoscWykonywaniaDzialanShort'
import PodzielnoscLiczb from './components/content/lessons/PodzielnoscLiczb/PodzielnoscLiczb'
import PodzielnoscLiczbShort from './components/content/lessons/PodzielnoscLiczb/PodzielnoscLiczbShort'
import UlamkiZwykle from './components/content/lessons/UlamkiZwykle/UlamkiZwykle'
import UlamkiZwykleShort from './components/content/lessons/UlamkiZwykle/UlamkiZwykleShort'
import UlamkiDziesietne from './components/content/lessons/UlamkiDziesietne/UlamkiDziesietne'
import UlamkiDziesietneShort from './components/content/lessons/UlamkiDziesietne/UlamkiDziesietneShort'
import Procenty from './components/content/lessons/Procenty/Procenty'
import ProcentyShort from './components/content/lessons/Procenty/ProcentyShort'
import LiczbyUjemne from './components/content/lessons/LiczbyUjemne/LiczbyUjemne'
import LiczbyUjemneShort from './components/content/lessons/LiczbyUjemne/LiczbyUjemneShort'
import WyrazeniaAlgebraiczne from './components/content/lessons/WyrazeniaAlgebraiczne/WyrazeniaAlgebraiczne'
import WyrazeniaAlgebraiczneShort from './components/content/lessons/WyrazeniaAlgebraiczne/WyrazeniaAlgebraiczneShort'
import TwierdzeniaIDowody from './components/content/lessons/TwierdzeniaIDowody/TwierdzeniaIDowody'
import TwierdzeniaIDowodyShort from './components/content/lessons/TwierdzeniaIDowody/TwierdzeniaIDowodyShort'
import Potegowanie from './components/content/lessons/Potegowanie/Potegowanie'
import PotegowanieShort from './components/content/lessons/Potegowanie/PotegowanieShort'
import Pierwiastkowanie from './components/content/lessons/Pierwiastkowanie/Pierwiastkowanie'
import PierwiastkowanieShort from './components/content/lessons/Pierwiastkowanie/PierwiastkowanieShort'
import DzialaniaNaWyrazeniachAlgebraicznych from './components/content/lessons/DzialaniaNaWyrazeniachAlgebraicznych/DzialaniaNaWyrazeniachAlgebraicznych'
import DzialaniaNaWyrazeniachAlgebraicznychShort from './components/content/lessons/DzialaniaNaWyrazeniachAlgebraicznych/DzialaniaNaWyrazeniachAlgebraicznychShort'
import RownaniaINierownosci from './components/content/lessons/RownaniaINierownosci/RownaniaINierownosci'
import RownaniaINierownosciShort from './components/content/lessons/RownaniaINierownosci/RownaniaINierownosciShort'
import ZbioryLiczbowe from './components/content/lessons/ZbioryLiczbowe/ZbioryLiczbowe'
import ZbioryLiczboweShort from './components/content/lessons/ZbioryLiczbowe/ZbioryLiczboweShort'
import RownaniaINierownosciLiniowe from './components/content/lessons/RownaniaINierownosciLiniowe/RownaniaINierownosciLiniowe'
import RownaniaINierownosciLinioweShort from './components/content/lessons/RownaniaINierownosciLiniowe/RownaniaINierownosciLinioweShort'

export const routes = [
  { path: '', component: Home }, 
  { path: '/home-short', component: HomeShort },
  { path: '/editor', component: Editor },
  { path: '/tree', component: Tree },
  { path: '/drzewoHD', component: DrzewoHD },

  { path: '/wprowadzenie', component: Wprowadzenie },
  { path: '/liczba', component: Liczba }, { path: '/liczba-short', component: LiczbaShort },
  { path: '/dodawanie', component: Dodawanie }, { path: '/dodawanie-short', component: DodawanieShort },
  { path: '/odejmowanie', component: Odejmowanie }, { path: '/odejmowanie-short', component: OdejmowanieShort },
  { path: '/mnozenie', component: Mnozenie }, { path: '/mnozenie-short', component: MnozenieShort },
  { path: '/dzielenie', component: Dzielenie }, { path: '/dzielenie-short', component: DzielenieShort },
  { path: '/kolejnosc-wykonywania-dzialan', component: KolejnoscWykonywaniaDzialan },  { path: '/kolejnosc-wykonywania-dzialan-short', component: KolejnoscWykonywaniaDzialanShort },
  { path: '/podzielnosc-liczb', component: PodzielnoscLiczb }, { path: '/podzielnosc-liczb-short', component: PodzielnoscLiczbShort },
  { path: '/ulamki-zwykle', component: UlamkiZwykle },  { path: '/ulamki-zwykle-short', component: UlamkiZwykleShort },
  { path: '/ulamki-dziesietne', component: UlamkiDziesietne },  { path: '/ulamki-dziesietne-short', component: UlamkiDziesietneShort },
  { path: '/procenty', component: Procenty }, { path: '/procenty-short', component: ProcentyShort },
  { path: '/liczby-ujemne', component: LiczbyUjemne }, { path: '/liczby-ujemne-short', component: LiczbyUjemneShort },
  { path: '/wyrazenia-algebraiczne', component: WyrazeniaAlgebraiczne }, { path: '/wyrazenia-algebraiczne-short', component: WyrazeniaAlgebraiczneShort },
  { path: '/twierdzenia-i-dowody', component: TwierdzeniaIDowody }, { path: '/twierdzenia-i-dowody-short', component: TwierdzeniaIDowodyShort },
  { path: '/potegowanie', component: Potegowanie },  { path: '/potegowanie-short', component: PotegowanieShort },
  { path: '/pierwiastkowanie', component: Pierwiastkowanie }, { path: '/pierwiastkowanie-short', component: PierwiastkowanieShort },
  { path: '/dzialania-na-wyrazeniach-algebraicznych', component: DzialaniaNaWyrazeniachAlgebraicznych }, { path: '/dzialania-na-wyrazeniach-algebraicznych-short', component: DzialaniaNaWyrazeniachAlgebraicznychShort },
  { path: '/rownania-i-nierownosci', component: RownaniaINierownosci }, { path: '/rownania-i-nierownosci-short', component: RownaniaINierownosciShort },
  { path: '/zbiory-liczbowe', component: ZbioryLiczbowe }, { path: '/zbiory-liczbowe-short', component: ZbioryLiczboweShort },
  { path: '/rownania-i-nierownosci-liniowe', component: RownaniaINierownosciLiniowe }, { path: '/rownania-i-nierownosci-liniowe-short', component: RownaniaINierownosciLinioweShort },
];