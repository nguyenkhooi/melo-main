import { Alert, Linking } from 'react-native';

export function errorReporter(e) {
	console.log('ERR: ', e)
	Alert.alert(
		'Oops! an error ocurred',
		'Send error log to developers?',
		[{ text: 'Cancel', onPress: () => { } }, { text: 'Send', onPress: () => mailError(e) }],
		{ cancelable: true }
	);
}

function mailError(e) {
	Linking.openURL(
		`mailto:drkhoi16@gmail.com?subject=Melo error log&body=LOG\n\n${JSON.stringify(
			e
		)}`
	);
}
