import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

function SocketListener(props) {
	if(props !== null){
		const currentSocketEvent = props.props;
		const [currentEvent, setEvent] = useState(currentSocketEvent);
		const {handleGlobalState} = useContext(Context);

		useEffect(() => { 
			setEvent(currentSocketEvent);  
			console.log("********************* currentSocketEvent ********************")
			console.log(currentSocketEvent)
		}, [currentSocketEvent]);
		
		useEffect(() => { 
			console.log('************** PROPS ***********************')
			console.log(props);
			console.log('************ CURRENT SOCKET EVENT ****************')
			console.log(currentSocketEvent)
			console.log('*********** CURRENT EVENT AT LISTENER *************')
			console.log(currentEvent)
			const handler = handlers[currentEvent.event];
			handler(currentEvent.value);          
		}, [currentEvent]);

		const handleAcoliteStamina = (data) => {handleGlobalState({stamina: data})};
		const handleAcoliteLife = (data) => {handleGlobalState({life: data})};
		const handleAcoliteGold = (data) => {handleGlobalState({gold: data})};
		const handleAcoliteXperience = (data) => {handleGlobalState({xp: data})};
		const handleNewAcolite = (data) => {handleGlobalState({user: data})};
		const handleSearchState = (data) => {handleGlobalState({search: data})}
		const handleArtifacts = (data) => {handleGlobalState({artifacts: data})}
		
		const handlers = {
			stamina: handleAcoliteStamina,
			life: handleAcoliteLife,
			gold: handleAcoliteGold,
			xp: handleAcoliteXperience,
			new_user: handleNewAcolite,
			search: handleSearchState,
			artifacts: handleArtifacts,
		}
	}
	return null;
}

export default SocketListener