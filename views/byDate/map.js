function(doc) {
   if(doc.type === 'pokemon') {
	   emit(doc.owned, doc);
   }
};