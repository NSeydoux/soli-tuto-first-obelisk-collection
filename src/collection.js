function customCollection(webid) {
  return `
    @prefix : <#>.
    @prefix coll: <>.
    @prefix ldp: <http://www.w3.org/ns/ldp#>.
    @prefix obelisk: <http://w3id.org/obelisk/ns/> .
    @prefix me: <${webid}> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    
    coll:
        a ldp:BasicContainer, ldp:Container;
        ldp:contains :myFirstObelisk.
        
    :myFirstObelisk a obelisk:Obelisk ;
        obelisk:ownedBy me: ;
        obelisk:heigth "15.0"^^xsd:float .
    `;
}

export { customCollection };
