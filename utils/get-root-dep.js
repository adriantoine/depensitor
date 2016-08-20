// Get the root dependency in case of specified nested folders
export default name => {
	if (!name) {
		return;
	}

	const splitName = name.split('/');
	let rootName = splitName[0];

	// Return if the split name
	if (splitName.length <= 1) {
		return rootName;
	}

	// Get one more in case of a private module
	if (name.substring(0, 1) === '@') {
		rootName += `/${splitName[1]}`;
	}

	return rootName;
};
