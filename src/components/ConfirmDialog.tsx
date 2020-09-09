import React from 'react';
import Dialog from 'react-native-dialog';
import styled, { withTheme } from 'styled-components/native';
import { foreground2Color, contrastColor } from '../themes/styles';
import { PRODUCT_SANS } from "assets";

function ConfirmDialog(props) {
	const { title, description, buttonTitle, isVisible, onCancel, cancelButton } = props;
	const { foreground, contrast, elevatedBG } = props.theme;
	return (
		<Dialog.Container
			visible={isVisible}
			backdropColor="black"
			onBackButtonPress={onCancel}
			onBackdropPress={onCancel}
			contentStyle={{ backgroundColor: elevatedBG }}>
			<DialogTitle numberOfLines={2}>{title}</DialogTitle>
			<DialogDescription>{description}</DialogDescription>
			{cancelButton ? (
				<Dialog.Button label="Cancel" color={contrast} onPress={onCancel} />
			) : null}
			<Dialog.Button label={buttonTitle} color={foreground} onPress={props.onConfirm} />
		</Dialog.Container>
	);
}

export default withTheme(ConfirmDialog);

const DialogTitle = styled(Dialog.Title)`
	font-family: ${PRODUCT_SANS};
	margin-left: 10px;
	color: ${foreground2Color};
`;

const DialogDescription = styled(Dialog.Description)`
	font-family: ${PRODUCT_SANS};
	padding: 10px;
	color: ${contrastColor};
`;
