const appTitle = 'Todo Apps'

export function setPageTitle(pageName){
	document.title = (pageName != undefined) ? pageName + ' - ' + appTitle : appTitle;
}

