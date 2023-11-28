import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

function SocketListener(props) {
	const {currentSocketEvent} = props;
	const [currentEvent, setEvent] = useState(currentSocketEvent);
	const {handleGlobalState} = useContext(Context);

	useEffect(() => { 
		setEvent(currentSocketEvent);        
	}, [currentSocketEvent]);
	
	useEffect(() => {    
		const handler = handlers[currentEvent.event];
		handler(currentEvent.value);          
	}, [currentEvent]);

	const handleAcoliteStamina = (data) => {handleGlobalState({stamina: data})};
	const handleAcoliteLife = (data) => {handleGlobalState({life: data})};
	const handleAcoliteGold = (data) => {handleGlobalState({gold: data})};
	const handleAcoliteXperience = (data) => {handleGlobalState({xp: data})};
	const handleNewAcolite = (data) => {handleGlobalState({user: data})};
	
	const handlers = {
		stamina: handleAcoliteStamina,
		life: handleAcoliteLife,
		gold: handleAcoliteGold,
		xp: handleAcoliteXperience,
		new_user: handleNewAcolite
	}
 
	return null;
}

export default SocketListener