import PotionsModal from "../components/PotionsModal";
import CleanScrollModal from "../components/CleanScrollModal";
import PergaminoModal from '../components/PergaminoModal';

const scrollHandler = (modals, towerState, setTowerState, potionState, setPotion) => {
    modals.splice(0);
    // modals.push(
    // <PotionsModal towerStatus={towerState} setTowerStatus={setTowerState} potionStatus={potionState} setPotionCreated={setPotion}/>,
    // <PergaminoModal towerStatus={towerState} setTowerStatus={setTowerState} />,
    // <CleanScrollModal potionStatus={potionState}/>
    // )
    // console.log(modals)
}

export default scrollHandler;