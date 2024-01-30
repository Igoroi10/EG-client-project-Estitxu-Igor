import { useContext, useEffect, useState } from 'react';
import { Context } from '../AppContext';

function SocketListener(props) {
	if(props !== null){
		const currentSocketEvent = props.props;
		const [currentEvent, setEvent] = useState(currentSocketEvent);
		const {globalState, handleGlobalState} = useContext(Context);

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
		const handleUserList = (data) => {
			handleGlobalState({userList: data});   

			data.forEach((userFromList) => {
				if(userFromList.email === globalState.user.email){
					handleGlobalState({user: userFromList});

				}
			}); 
		}
		const handleUserUpdate = (data) => {    
			if(globalState.user.name === data.name)
				handleGlobalState({user: data})
		};
		const handleUserCoord = (data) => {
			globalState.userList.forEach(element => {
				if(element.name === data.name && data.lat !== 0 && data.lon !== 0){
					element.latitude = data.lat;
					element.longitude = data.lon;
				}
			})
		}
		const handleObjectList = (data) => {handleGlobalState({items: data})}
		
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
			userRecovery: handleUserUpdate,
			coordUser: handleUserCoord,
			objectList: handleObjectList,
		}
	}
	return null;
}

export default SocketListener