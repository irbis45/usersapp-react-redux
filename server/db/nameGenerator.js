const malename = [
	'Allen','Bob','Carlton',
	'David','Ernie','Foster',
	'George','Howard','Ian',
	'Jeffery','Kenneth','Lawrence',
	'Michael','Nathen','Orson',
	'Peter','Quinten','Reginald',
	'Stephen','Thomas','Morris',
	'Victor','Walter','Xavier',
	'Charles','Anthony','Gordon',
	'Percy','Conrad','Quincey',
	'Armand','Jamal','Andrew',
	'Matthew','Mark','Gerald'
];
const femalename = [
	'Alice','Bonnie','Cassie',
	'Donna','Ethel','Grace',
	'Heather','Jan','Katherine',
	'Julie','Marcia','Patricia',
	'Mabel','Jennifer','Dorthey',
	'Mary Ellen','Jacki','Jean',
	'Betty','Diane','Annette',
	'Dawn','Jody','Karen',
	'Mary Jane','Shannon','Stephanie',
	'Kathleen','Emily','Tiffany',
	'Angela','Christine','Debbie',
	'Karla','Sandy','Marilyn',
	'Brenda','Hayley','Linda'
];

const lastname = [
	'Adams','Bowden','Conway',
	'Darden','Edwards','Flynn',
	'Gilliam','Holiday','Ingram',
	'Johnson','Kraemer','Hunter',
	'McDonald','Nichols','Pierce',
	'Sawyer','Saunders','Schmidt',
	'Schroeder','Smith','Douglas',
	'Ward','Watson','Williams',
	'Winters','Yeager','Ford',
	'Forman','Dixon','Clark',
	'Churchill','Brown','Blum',
	'Anderson','Black','Cavenaugh',
	'Hampton','Jenkins','Prichard'
];

export function RandomName() {

	const gender = Math.round(Math.random());
	const r = Math.floor(Math.random() * lastname.length);
	let i = 0;
	let fname = '';

	if(gender) {
		i = Math.floor(Math.random() * femalename.length);
		fname = femalename[i];
	}
	else {
		i = Math.floor(Math.random() * malename.length);
		fname = malename[i];
	}

	return {fname: fname, lname: lastname[r]};

}