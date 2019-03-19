
import Home from './components/content/Home'
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
import KolejnoscWykonywaniaDzialan from './components/content/lessons/KolejnoscWykonywaniaDzialan/KolejnoscWykonywaniaDzialan'
import UlamkiZwykle from './components/content/lessons/UlamkiZwykle/UlamkiZwykle'
import UlamkiDziesietne from './components/content/lessons/UlamkiDziesietne/UlamkiDziesietne'
import PodzielnoscLiczb from './components/content/lessons/PodzielnoscLiczb/PodzielnoscLiczb'
import Procenty from './components/content/lessons/Procenty/Procenty'
import LiczbyUjemne from './components/content/lessons/LiczbyUjemne/LiczbyUjemne'
import WyrazeniaAlgebraiczne from './components/content/lessons/WyrazeniaAlgebraiczne/WyrazeniaAlgebraiczne'
import TwierdzeniaIDowody from './components/content/lessons/TwierdzeniaIDowody/TwierdzeniaIDowody'
import Potegowanie from './components/content/lessons/Potegowanie/Potegowanie'
import Pierwiastkowanie from './components/content/lessons/Pierwiastkowanie/Pierwiastkowanie'
import DzialaniaNaWyrazeniachAlgebraicznych from './components/content/lessons/DzialaniaNaWyrazeniachAlgebraicznych/DzialaniaNaWyrazeniachAlgebraicznych'

export const routes = [
  { path: '', component: Home },
  { path: '/editor', component: Editor },
  { path: '/tree', component: Tree },
  { path: '/drzewoHD', component: DrzewoHD },

  { path: '/wprowadzenie', component: Wprowadzenie },
  { path: '/liczba', component: Liczba }, { path: '/liczba-short', component: LiczbaShort },
  { path: '/dodawanie', component: Dodawanie }, { path: '/dodawanie-short', component: DodawanieShort },
  { path: '/odejmowanie', component: Odejmowanie }, { path: '/odejmowanie-short', component: OdejmowanieShort },
  { path: '/mnozenie', component: Mnozenie }, { path: '/mnozenie-short', component: MnozenieShort },
  { path: '/dzielenie', component: Dzielenie },
  { path: '/kolejnosc-wykonywania-dzialan', component: KolejnoscWykonywaniaDzialan },
  { path: '/ulamki-zwykle', component: UlamkiZwykle },
  { path: '/ulamki-dziesietne', component: UlamkiDziesietne },
  { path: '/podzielnosc-liczb', component: PodzielnoscLiczb },
  { path: '/procenty', component: Procenty },
  { path: '/liczby-ujemne', component: LiczbyUjemne },
  { path: '/wyrazenia-algebraiczne', component: WyrazeniaAlgebraiczne },
  { path: '/twierdzenia-i-dowody', component: TwierdzeniaIDowody },
  { path: '/potegowanie', component: Potegowanie },
  { path: '/pierwiastkowanie', component: Pierwiastkowanie },
  { path: '/dzialania-na-wyrazeniach-algebraicznych', component: DzialaniaNaWyrazeniachAlgebraicznych },
];
