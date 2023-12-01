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
		const handleConsoleError = (data) => {console.error(data)}
		const handleHello = (data) => {}
		const handleUserList = (data) => {handleGlobalState({userList: data})}
		
		const handlers = {
			stamina: handleAcoliteStamina,
			life: handleAcoliteLife,
			gold: handleAcoliteGold,
			xp: handleAcoliteXperience,
			new_user: handleNewAcolite,
			search: handleSearchState,
			artifacts: handleArtifacts,
			hello: handleHello,
			error: handleConsoleError,
			userList: handleUserList,
		}
	}
	return null;
}

export default SocketListener