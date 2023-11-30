import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

function SocketListener(props) {
	if(props !== null){
		const currentSocketEvent = props.props;
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
		const handleNewAcolite = (data) => {handleGlobalState({id: data})};
		const handleSearchState = (data) => {handleGlobalState({search: data})}
		const handleArtifacts = (data) => {handleGlobalState({artifacts: data})}
		const handleHello = (data) => {}
		
		const handlers = {
			stamina: handleAcoliteStamina,
			life: handleAcoliteLife,
			gold: handleAcoliteGold,
			xp: handleAcoliteXperience,
			new_user: handleNewAcolite,
			search: handleSearchState,
			artifacts: handleArtifacts,
			hello: handleHello,
		}
	}
	return null;
}

export default SocketListener