const db = require('../db');

class TableController {

    async getTable(req, res) {
        let {page, column, operator, value} = req.query;
        const offset = (page - 1) * 10
        if (!column) {
            const data = await db.query(`SELECT * FROM city OFFSET ${offset} LIMIT 10`);
            const count = await db.query(`SELECT COUNT(*) FROM city`);
            res.json(JSON.stringify([count.rows[0], data.rows]))
        }
        (operator === 'like') && (value = `'%${value}%'`);
        const data = await db.query(`SELECT * FROM city WHERE ${column} ${operator} ${value} OFFSET ${offset} LIMIT 10`);
        const count = await db.query(`SELECT COUNT(*) FROM city WHERE ${column} ${operator} ${value}`);
        res.json(JSON.stringify([count.rows[0], data.rows]))
    }


    async fillTable(req, res) {
        /*const {name, amount, distance} = req.body;*/
        const cities = ["Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge",  "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Huntsville", "Independence", "Indianapolis", "Jackson", "Jacksonville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Panama City", "Pasadena", "Paterson", "Pembroke Pines","Pensacola", "Peoria", "Philadelphia", "Phoenix",  "Riverside", "Roanoke", "Rochester", "Rockford", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton",  "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York"];
        for (let city of cities) {
            let amount = Math.round(Math.random() * 1000);
            let distance = Math.round(Math.random() * 1000);
            await db.query(`INSERT INTO city (name, amount, distance) values ($1, $2, $3)`, [city, amount, distance]);
        }
        res.json('Perfect!');
    }
}

module.exports = new TableController();