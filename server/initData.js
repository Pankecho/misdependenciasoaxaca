const Tramite = require("./models/tramite"),
        mongoose = require("mongoose");

function insertar() {
    Tramite.find({}, (err, data) => {
        if (data.length == 0) {
            let tramite1 = {
                "nombre": "Afiliación al seguro popular",
                "categoria": ["Salud"],
                "requisitos": ["Comprobante reciente de domicilio (no mayor a 3 meses)", "CURP o acta de nacimiento de todos los integrantes de la familia.",
                    "En el caso de recién nacidos, certificado de nacimiento.", "Identificación oficial con fotografía del titular.", "De ser el caso, comprobante de que eres beneficiario de algún programa de apoyo o subsidio del Gobierno Federal o comprobante que te acredite como parte de alguna colectividad.",
                    "Comprobante de estudios de los hijos o representados dependientes del titular de hasta 25 años de edad, de ser el caso.", "Diagnóstico de embarazo, en caso de que alguna integrante de la familia se encuentre en dicho estado."],
                "dependencias": [{
                    "nombre": "OFICINAS CENTRALES",
                    "direccion": "HEROICA ESCUELA NAVAL MILITAR No. 221 ESQ. EMILIO CARRANZA. COL. REFORMA. CP 68050",
                    "telefono": ["(951) 502 62 31", "(951) 502 62 32", "(951) 502 62 33"],
                    "latitud": "17.0785925",
                    "longitud": "-96.7178707",
                    "paginaWeb": "http://www.seguropopularoaxaca.gob.mx/",
                    "comentarios": []
                },
                {
                    "nombre": "OFICINAS CENTRALES (MAO ANEXO)",
                    "direccion": "HEROICA ESCUELA NAVAL MILITAR No. 221 ESQ. EMILIO CARRANZA. COL. REFORMA. CP 68050",
                    "telefono": ["(951) 502 62 31", "(951) 502 62 32", "(951) 502 62 33"],
                    "latitud": "17.0785925",
                    "longitud": "-96.7178707",
                    "paginaWeb": "http://www.seguropopularoaxaca.gob.mx/",
                    "comentarios": []
                },
                {
                    "nombre": "HOSPITAL GENERAL “DR. AURELIO VALDIVIESO”",
                    "direccion": "CALZADA PORFIRIO DIAZ NO. 400 COL. REFORMA. OAXACA DE JUAREZ OAXACA. CP 68050	",
                    "telefono": ["(951) 513 46 12"],
                    "latitud": "17.0821309",
                    "longitud": "-96.7208367",
                    "paginaWeb": "http://www.seguropopularoaxaca.gob.mx/",
                    "comentarios": [{ "fecha": "", "descripcion": "" }]
                },
                {
                    "nombre": "HOSPITAL DE LA NIÑEZ OAXAQUEÑA",
                    "direccion": "CARRETERA PUERTO ANGEL KM 12.5 SAN BARTOLO COYOTEPEC, OAXACA. CP 71256",
                    "telefono": ["(951) 551 00 44"],
                    "latitud": "16.9591319",
                    "longitud": "-96.7093468",
                    "paginaWeb": "http://www.hno.oaxaca.gob.mx/",
                    "comentarios": [{ "fecha": "", "descripcion": "" }]
                }
                ]
            };

            let aux=new Tramite(tramite1);
            aux.save((err,t)=>{
                if(err) throw err;
                console.log(t);
            });
            
        }
    });
}

module.exports=insertar;        