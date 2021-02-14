export function avatarText(text){
	return text.charAt(0).toUpperCase();
}
export function capitalize (text){
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toLower(text){
	return text.toLowerCase();
}
export function toUpper(text){
  return text.toUpperCase();
}

export function putArticleAndtoLower(text){
	let vowels = ['A', 'E', 'I', 'O', 'U']
	if(vowels.includes(text.charAt(0)))
		return 'an ' + text.toLowerCase()
	else
		return 'a ' + text.toLowerCase()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

export function pad7(num) {
  return num.toString().padStart(7,'0')
}

export function noWrapText(text,length = 100){
	if(text != null && text.length >= length){
		return text.substring(0,length) + "...";
	}
	return text;
}

export function formatDateTime(str) {
      let date = new Date(str)
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "July",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();

      return day + ' ' + monthNames[monthIndex] + ' ' + year + ' , ' + strTime;
}

export function formatTime(str) {
      let date = new Date(str)
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();

      return strTime;
}

export function formatTimeStr(str) {
  let date = new Date(str * 1000)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();

  return strTime;
}

export function formatDate(str) {
      let date = new Date(str)
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "July",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function formatMoney(number, decPlaces, decSep, thouSep) {
decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
decSep = typeof decSep === "undefined" ? "." : decSep;
thouSep = typeof thouSep === "undefined" ? "," : thouSep;
var sign = number < 0 ? "-" : "";
var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
var j = (j = i.length) > 3 ? j % 3 : 0;

return sign +
  (j ? i.substr(0, j) + thouSep : "") +
  i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
  (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

export function striphtml(value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
}

export function calculateAgeByDate(value) {
  var age
  if(value)
  {
      let split = value.split('-')
      let input_year = split[0]
      let today = new Date()
      let year = today.getFullYear()

      age = year - input_year
  }
  else
      age = ''
  return age
}


export function getInitials(text) {
  return text.match(/\b(\w)/g).join('. ');
}