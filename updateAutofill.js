// updateAutofill.js
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});

var e=decodeURIComponent(window.location.search.substring(1));e=e.split("&").join("&amp;");

if (contains(document.getElementById("content").innerHTML, e)) {

	document.getElementById("Radio_New_Listing").checked||document.getElementById("Radio_Correction").checked||document.getElementById("Radio_Delete").checked||(document.getElementById("Radio_Correction").checked=!0);
	
	var f=document.getElementById("content").innerHTML;contentArr=f.split("<p><b>"+e+"</b><br>");f=e+"<br>"+contentArr[1];contentArr=f.split("</p>");f=contentArr[0];f=f.replace(/\n/g,"");contentArr=f.split("<br>");
	
	document.getElementById("name").value = contentArr[0].split("&amp;").join("&");
	document.getElementById("address").value = contentArr[1];
	
	var urlindex = 0; var descriptionindex = 0;
	
	for (tmp=0; tmp<contentArr.length; tmp++) { // URL
		if (contentArr[tmp].indexOf( 'http' ) > -1) {
			pos = contentArr[tmp].indexOf( 'http' );
			document.getElementById("URL").value = contentArr[tmp].substring( pos );
			pos = document.getElementById("URL").value.indexOf( '"' );
			document.getElementById("URL").value = document.getElementById("URL").value.substring( 0, pos );
			urlindex = tmp;
			continue;
		}
		if (contentArr[tmp].indexOf( "</span>" ) > -1) { // description
			document.getElementById("description").value = contentArr[tmp].substring(24);
			if (contentArr.length > tmp && typeof contentArr[tmp+1] !== 'undefined' ) { document.getElementById("description").value += contentArr[tmp+1]; }
			document.getElementById("description").value = document.getElementById("description").value.replace("&gt;br&gt;", "");
			document.getElementById("description").value = document.getElementById("description").value.trim();
			descriptionindex = tmp;
			continue;
		}
	}
	if (urlindex == 3) {
		document.getElementById("phone").value = contentArr[2];
	}
	if (urlindex == 0 && descriptionindex == 3) {
		document.getElementById("phone").value = contentArr[2];
	}
	if (urlindex == 0 && descriptionindex == 0 && typeof contentArr[2] !== 'undefined') {
		document.getElementById("phone").value = contentArr[2];
	}
}

function contains(a,b){if("undefined"==typeof a||"undefined"==typeof b||""==a||""==b)return!1;a=a.toUpperCase();b=b.toUpperCase();return-1!==a.indexOf(b)};