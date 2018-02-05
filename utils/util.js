class Util {
	constructor() {

	}
	hasClass(elem, cls) {
  		cls = cls || '';
  		if (cls.replace(/\s/g, '').length == 0) return false;
  		return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	}
	addClass(elem, cls) {
  		if (!this.hasClass(elem, cls)) {
   		 ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  		}
	}
	removeClass(elem, cls) {
  		if (this.hasClass(elem, cls)) {
	    	let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
	    	while (newClass.indexOf(' ' + cls + ' ') >= 0) {
	      		newClass = newClass.replace(' ' + cls + ' ', ' ');
	    	}
	    	elem.className = newClass.replace(/^\s+|\s+$/g, '');
  		}
	}
	parentsUtil(elem, cls) {
		if(elem){
			while (elem&&!this.hasClass(elem, cls)) {
	            elem = elem.parentNode;
	        }
	        return elem;
		}else{
			return null;
		}
	}
}

export default Util